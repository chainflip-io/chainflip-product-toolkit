import { type SolanaCcmAdditionalData } from '@chainflip/scale/codecs';
import { assert } from '@chainflip/utils/assertion';
import { type HexString, type VaultSwapData } from '@chainflip/utils/types';
import { parseUrlWithBasicAuth } from '@chainflip/utils/url';
import { BorshInstructionCoder, type Idl } from '@coral-xyz/anchor';
import {
  Connection,
  PublicKey,
  type VersionedTransactionResponse,
  type PartiallyDecodedInstruction,
  type ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { devnet, mainnet } from './idls';
import { swapSchema } from './schemas';

const getSolanaConnection = (solanaEndpoint: string) => {
  const { url, headers } = parseUrlWithBasicAuth(solanaEndpoint);

  return new Connection(url, {
    httpHeaders: headers,
    // for injecting responses in the tests
    fetch,
    // fetch: async (...args) => {
    //   const res = await fetch(...args);

    //   res.text = async () => {
    //     const text = await Response.prototype.text.call(res);
    //     console.log(text);
    //     return text;
    //   };

    //   return res;
    // },
  });
};

export type Transfer = {
  signature: string;
  amount: bigint;
  slot: number;
};

type SolanaNetwork = 'mainnet' | 'devnet';
type SupportedToken = 'SolUsdc';
type TokenMintAddress = string & { __brand: 'TokenMintAddress' };

const addresses = {
  mainnet: {
    SolUsdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
  devnet: {
    SolUsdc: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
  },
} as Record<SolanaNetwork, Record<SupportedToken, TokenMintAddress>>;

const getSolDiff = (tx: VersionedTransactionResponse, publicKey: PublicKey) => {
  assert(tx.meta !== null, 'tx meta is null');

  const accountIndex = tx.transaction.message.staticAccountKeys.findIndex((key) =>
    key.equals(publicKey),
  );

  const preBalance = tx.meta.preBalances.at(accountIndex);
  assert(preBalance !== undefined, 'failed to find preBalance');
  const postBalance = tx.meta.postBalances.at(accountIndex);
  assert(postBalance !== undefined, 'failed to find postBalance');

  const diff = postBalance - preBalance;

  return BigInt(diff);
};

const getTokenDiff = (
  tx: VersionedTransactionResponse,
  publicKey: PublicKey,
  tokenMintAddress: TokenMintAddress,
) => {
  assert(tx.meta !== null, 'tx meta is null');
  assert(tx.meta.preTokenBalances != null, 'preTokenBalances is null');
  assert(tx.meta.postTokenBalances != null, 'postTokenBalances is null');

  const owner = publicKey.toBase58();

  const preTokenAmount = tx.meta.preTokenBalances.find(
    (b) => b.mint === tokenMintAddress && b.owner === owner,
  );
  const postTokenAmount = tx.meta.postTokenBalances.find(
    (b) => b.mint === tokenMintAddress && b.owner === owner,
  );

  const preBalance = BigInt(preTokenAmount?.uiTokenAmount.amount ?? 0);
  const postBalance = BigInt(postTokenAmount?.uiTokenAmount.amount ?? 0);
  return postBalance - preBalance;
};

/** Address of the SPL Token program */
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
/** Address of the SPL Associated Token Account program */
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

const getAssociatedTokenAddressSync = (owner: PublicKey, tokenMintAddress: TokenMintAddress) => {
  const [address] = PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), new PublicKey(tokenMintAddress).toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  return address;
};

const fetchTransfers = async (
  rpcUrl: string,
  depositAddressString: string,
  tokenMintAddress: TokenMintAddress | undefined,
  depositCount: number,
): Promise<Transfer[]> => {
  const conn = getSolanaConnection(rpcUrl);

  const depositAddress = new PublicKey(depositAddressString);

  const owner = !tokenMintAddress
    ? depositAddress
    : getAssociatedTokenAddressSync(depositAddress, tokenMintAddress);

  const results: Transfer[] = [];

  let before: string | undefined;

  for (let i = 0; i < 5; i += 1) {
    const sigs = await conn.getSignaturesForAddress(owner, { limit: 20, before });

    sigs.sort((a, b) => b.slot - a.slot);

    assert(sigs.length > 0, 'failed to find signatures');

    const transactions = await conn.getTransactions(
      sigs.map((s) => s.signature),
      { maxSupportedTransactionVersion: 0 },
    );

    results.push(
      ...sigs.flatMap((sig) => {
        const txs = transactions.filter(
          (tx) => tx !== null && tx.transaction.signatures.includes(sig.signature),
        );

        assert(txs.length === 1, 'failed to find matching transaction signature');

        const tx = txs[0]!;

        const diff = !tokenMintAddress
          ? getSolDiff(tx, depositAddress)
          : getTokenDiff(tx, depositAddress, tokenMintAddress);

        if (diff <= 0n) return [];

        return [{ amount: diff, signature: sig.signature, slot: sig.slot }];
      }),
    );

    if (results.length >= depositCount) return results;

    before = sigs.sort((a, b) => b.slot - a.slot).at(-1)?.signature;

    assert(before, 'failed to find signature for pagination');
  }

  throw new Error('too much pagination');
};

export type DepositInfo = {
  amount: bigint;
  maxSlot: number;
};

const tryToAlignDepositsAndTransfers = (
  transfers: Transfer[],
  deposits: DepositInfo[],
  offset: number,
  reportingErrorTolerance: number,
) => {
  let depIndex = 0;
  let txStartIndex = offset;
  const results: string[][] = [];

  while (txStartIndex < transfers.length && depIndex < deposits.length) {
    let total = 0n;
    const currentDeposit = deposits[depIndex];
    let success = false;

    for (let txEndIndex = txStartIndex; txEndIndex < transfers.length; txEndIndex += 1) {
      if (currentDeposit.maxSlot) {
        const blockDiff = transfers[txEndIndex].slot - currentDeposit.maxSlot;

        if (blockDiff > reportingErrorTolerance) {
          throw new Error('transfers are too new');
        }
      }

      total += transfers[txEndIndex].amount;

      if (total === currentDeposit.amount) {
        const hashes: string[] = [];
        for (let i = txStartIndex; i <= txEndIndex; i += 1) {
          if (!hashes.includes(transfers[i].signature)) {
            hashes.push(transfers[i].signature);
          }
        }
        results.push(hashes);
        txStartIndex = txEndIndex + 1;
        depIndex += 1;
        success = true;
        break;
      }
    }

    if (!success) throw new Error('failed to align deposits and transfers');
  }

  assert(depIndex === deposits.length, 'failed to match all deposits to transfers');
  return results;
};

export class TransactionMatchingError extends Error {
  constructor(
    message: string,
    public cause: Error,
    public deposits: DepositInfo[],
    public transfers: Transfer[],
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const findTransactionSignatures = async (
  rpcUrl: string,
  depositAddress: string,
  asset: 'Sol' | 'SolUsdc',
  deposits: DepositInfo[],
  network: SolanaNetwork,
  reportingErrorTolerance = 50,
): Promise<string[][]> => {
  const tokenMintAddress = asset === 'Sol' ? undefined : addresses[network][asset];
  const transfers = await fetchTransfers(rpcUrl, depositAddress, tokenMintAddress, deposits.length);

  let error: Error;

  for (let txStartIndex = 0; txStartIndex < transfers.length; txStartIndex += 1) {
    try {
      return tryToAlignDepositsAndTransfers(
        transfers,
        deposits,
        txStartIndex,
        reportingErrorTolerance,
      );
    } catch (err) {
      if (err instanceof Error) error = err;
      // noop
    }
  }

  throw new TransactionMatchingError(error!.message, error!, deposits, transfers);
};

export const findVaultSwapSignature = async (
  solanaEndpoint: string,
  accountAddress: string,
  slot: number,
): Promise<string> => {
  const connection = getSolanaConnection(solanaEndpoint);

  const allSignatures = await connection.getSignaturesForAddress(new PublicKey(accountAddress), {
    minContextSlot: slot,
    limit: 10,
  });

  const signatures = allSignatures.filter((sig) => sig.slot === slot);

  assert(signatures.length === 1, 'failed to find signature');

  return signatures[0].signature;
};

const findIdlAndInstruction = (
  tx: ParsedTransactionWithMeta,
): { idl: Idl; instruction: PartiallyDecodedInstruction } | { idl: null; instruction: null } => {
  for (const inst of tx.transaction.message.instructions) {
    switch (inst.programId.toBase58()) {
      case mainnet.address:
        return { idl: mainnet, instruction: inst as PartiallyDecodedInstruction };
      case devnet.address:
        return { idl: devnet, instruction: inst as PartiallyDecodedInstruction };
    }
  }

  return { idl: null, instruction: null };
};

export const findVaultSwapData = async (
  rpcUrl: string,
  signature: string,
): Promise<VaultSwapData<string, HexString | SolanaCcmAdditionalData | null> | null> => {
  const methodToAsset = {
    x_swap_native: 'Sol',
    x_swap_token: 'SolUsdc',
  } as const;

  const connection = getSolanaConnection(rpcUrl);

  const tx = await connection.getParsedTransaction(signature, {
    commitment: 'confirmed',
    maxSupportedTransactionVersion: 0,
  });

  if (!tx) return null;

  const { idl, instruction } = findIdlAndInstruction(tx);

  if (instruction === null && idl === null) return null;

  const coder = new BorshInstructionCoder(idl);
  const decoded = coder.decode(instruction.data, 'base58');
  const data = swapSchema.parse(decoded);

  return {
    depositChainBlockHeight: tx.slot,
    inputAsset: methodToAsset[data.name],
    ...data.data,
  };
};

import { assert, unreachable } from '@chainflip/utils/assertion';
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

export const parseUrlWithBasicAuth = (url: string) => {
  const rpcUrl = new URL(url);

  let headers = {};
  if (rpcUrl.username || rpcUrl.password) {
    headers = {
      Authorization: `Basic ${Buffer.from(`${rpcUrl.username}:${rpcUrl.password}`).toString(
        'base64',
      )}`,
    };
    rpcUrl.username = '';
    rpcUrl.password = '';
  }

  return { url: rpcUrl.toString(), headers };
};

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

const addresses = {
  SolUsdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
};

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

const getTokenDiff = (tx: VersionedTransactionResponse, publicKey: PublicKey, asset: 'SolUsdc') => {
  assert(tx.meta !== null, 'tx meta is null');
  assert(tx.meta.preTokenBalances != null, 'preTokenBalances is null');
  assert(tx.meta.postTokenBalances != null, 'postTokenBalances is null');

  const tokenMintAddress = addresses[asset];
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

const getAssociatedTokenAddressSync = (owner: PublicKey, asset: 'SolUsdc') => {
  const [address] = PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), new PublicKey(addresses[asset]).toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  return address;
};

const fetchTransfers = async (
  rpcUrl: string,
  depositAddressString: string,
  asset: 'Sol' | 'SolUsdc',
  depositCount: number,
): Promise<Transfer[]> => {
  const conn = getSolanaConnection(rpcUrl);

  const depositAddress = new PublicKey(depositAddressString);

  const owner =
    asset === 'Sol' ? depositAddress : getAssociatedTokenAddressSync(depositAddress, asset);

  const results: Transfer[] = [];

  let before: string | undefined;

  for (let i = 0; i < 5; i += 1) {
    const sigs = await conn.getSignaturesForAddress(owner, { limit: 20, before });

    assert(sigs.length > 0, 'failed to find signatures');

    const transactions = await conn.getTransactions(
      sigs.map((s) => s.signature),
      { maxSupportedTransactionVersion: 0 },
    );

    results.push(
      ...transactions
        .map((tx, index): Transfer | null => {
          assert(tx !== null, 'tx is null');

          const diff =
            asset === 'Sol'
              ? getSolDiff(tx, depositAddress)
              : getTokenDiff(tx, depositAddress, asset);

          if (diff <= 0n) return null;

          return {
            amount: diff,
            signature: sigs[index].signature,
            slot: sigs[index].slot,
          };
        })
        .filter((transfer) => transfer !== null)
        .sort((a, b) => b.slot - a.slot),
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

export const findTransactionSignatures = async (
  rpcUrl: string,
  depositAddress: string,
  asset: 'Sol' | 'SolUsdc',
  deposits: DepositInfo[],
  fetcher: typeof fetchTransfers = fetchTransfers,
  reportingErrorTolerance = 50,
) => {
  const transfers = await fetcher(rpcUrl, depositAddress, asset, deposits.length);

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

  // eslint-disable-next-line no-throw-literal -- false positive
  throw error!;
};

export const findVaultSwapSignature = async (
  solanaEndpoint: string,
  accountAddress: string,
  slot: number,
) => {
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

export const findVaultSwapData = async (rpcUrl: string, signature: string) => {
  const connection = getSolanaConnection(rpcUrl);

  const tx = await connection.getParsedTransaction(signature);

  if (!tx) return null;

  const { idl, instruction } = findIdlAndInstruction(tx);

  if (instruction === null && idl === null) return null;

  const coder = new BorshInstructionCoder(idl);
  const decoded = coder.decode(instruction.data, 'base58');
  const data = swapSchema.parse(decoded);

  switch (data.name) {
    case 'x_swap_native':
      return {
        sourceChain: 'Solana',
        sourceAsset: 'Sol',
        ...data.data,
      };
    case 'x_swap_token':
      return {
        sourceChain: 'Solana',
        // only works because we only support the USDC. if we add more tokens
        // we get to have more fun here
        sourceAsset: 'SolUsdc',
        ...data.data,
      };
    /* v8 ignore next 2 */
    default:
      return unreachable(data, 'unexpected program call');
  }
};

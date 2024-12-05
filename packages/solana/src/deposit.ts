import { isNotNullish } from '@chainflip/utils/guard';
import { Connection, PublicKey, type VersionedTransactionResponse } from '@solana/web3.js';

const getSolanaConnection = (solanaEndpoint: string) => {
  const rpcUrl = new URL(solanaEndpoint);

  let authorizationHeader: string | undefined;
  if (rpcUrl.username || rpcUrl.password) {
    authorizationHeader = `Basic ${Buffer.from(`${rpcUrl.username}:${rpcUrl.password}`).toString('base64')}`;
    rpcUrl.username = '';
    rpcUrl.password = '';
  }

  return new Connection(rpcUrl.toString(), {
    httpHeaders: authorizationHeader ? { Authorization: authorizationHeader } : {},
  });
};

const getTransferAmount = (
  tx: VersionedTransactionResponse,
  destinationAddress: string,
  tokenMintAddress: string | null,
) => {
  if (tokenMintAddress) {
    const preBalance = BigInt(
      tx.meta?.preTokenBalances?.find(
        (b) => b.mint === tokenMintAddress && b.owner === destinationAddress,
      )?.uiTokenAmount.amount ?? 0,
    );
    const postBalance = BigInt(
      tx.meta?.postTokenBalances?.find(
        (b) => b.mint === tokenMintAddress && b.owner === destinationAddress,
      )?.uiTokenAmount.amount ?? 0,
    );

    return postBalance - preBalance;
  }

  const depositPublicKey = new PublicKey(destinationAddress);
  const accountIndex = tx.transaction.message.staticAccountKeys.findIndex((key) =>
    key.equals(depositPublicKey),
  );

  const preBalance = tx.meta?.preBalances[accountIndex] ?? 0;
  const postBalance = tx.meta?.postBalances[accountIndex] ?? 0;

  return BigInt(postBalance - preBalance);
};

export const findSolanaDepositSignature = async (
  solanaEndpoint: string,
  tokenAddress: string | null,
  depositAddress: string,
  depositAmount: bigint,
  minSlot: number,
  maxSlot: number,
) => {
  const connection = getSolanaConnection(solanaEndpoint);
  const allSignatures = await connection.getSignaturesForAddress(new PublicKey(depositAddress));
  const filteredSignatures = allSignatures.filter(
    (sig) => sig.slot >= minSlot && sig.slot <= maxSlot,
  );

  const txs = await connection.getTransactions(
    filteredSignatures.map((sig) => sig.signature),
    { maxSupportedTransactionVersion: 0 },
  );

  for (const tx of txs.filter(isNotNullish)) {
    const txAmount = getTransferAmount(tx, depositAddress, tokenAddress);
    const txAmountRatio = Number(txAmount) / Number(depositAmount.toString());

    // witnessed amount can be slightly higher than transaction amount if deposit is witnessed together with spam transactions
    if (txAmountRatio > 0.99) {
      return tx.transaction.signatures[0];
    }
  }

  return undefined;
};

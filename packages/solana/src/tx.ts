import { isNullish } from '@chainflip/utils/guard';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { addresses } from './consts';

export const determineInputAsset = (tx: ParsedTransactionWithMeta) => {
  if (isNullish(tx.meta?.preTokenBalances) || tx.meta.preTokenBalances.length === 0) {
    return 'Sol';
  }

  for (const bal of tx.meta.preTokenBalances) {
    switch (bal.mint) {
      case addresses.mainnet.SolUsdc:
      case addresses.devnet.SolUsdc:
        return 'SolUsdc';
      case addresses.mainnet.SolUsdt:
      case addresses.devnet.SolUsdt:
        return 'SolUsdt';
    }
  }

  throw new Error('failed to determine input asset');
};

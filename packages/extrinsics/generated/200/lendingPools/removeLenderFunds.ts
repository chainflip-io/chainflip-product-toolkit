import { type ChainflipAsset } from '../common';

export type LendingPoolsRemoveLenderFunds = [
  asset: ChainflipAsset,
  amount: `${number}` | `0x${string}` | null,
];

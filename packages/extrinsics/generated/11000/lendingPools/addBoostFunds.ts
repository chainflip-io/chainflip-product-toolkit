import { type ChainflipAsset } from '../common';

export type LendingPoolsAddBoostFunds = [
  asset: ChainflipAsset,
  amount: `${number}` | `0x${string}`,
  poolTier: number,
];

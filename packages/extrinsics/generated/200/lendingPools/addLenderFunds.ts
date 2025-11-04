import { type ChainflipAsset } from '../common';

export type LendingPoolsAddLenderFunds = [
  asset: ChainflipAsset,
  amount: `${number}` | `0x${string}`,
];

import { type ChainflipAsset } from '../common';

export type LendingPoolsRemoveCollateral = [
  collateral: Map<{ [key in ChainflipAsset]: {} }, `${number}` | `0x${string}`>,
];

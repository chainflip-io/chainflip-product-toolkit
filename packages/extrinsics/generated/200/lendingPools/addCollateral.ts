import { type ChainflipAsset } from '../common';

export type LendingPoolsAddCollateral = [
  collateralTopupAsset: ChainflipAsset | null,
  collateral: Map<{ [key in ChainflipAsset]: {} }, `${number}` | `0x${string}`>,
];

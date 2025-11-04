import { type ChainflipAsset } from '../common';

export type LendingPoolsAddCollateral = [
  primaryCollateralAsset: ChainflipAsset | null,
  collateral: Map<{ [key in ChainflipAsset]: {} }, `${number}` | `0x${string}`>,
];

import { type ChainflipAsset } from '../common';

export type LendingPoolsRequestLoan = [
  loanAsset: ChainflipAsset,
  loanAmount: `${number}` | `0x${string}`,
  primaryCollateralAsset: ChainflipAsset | null,
  extraCollateral: Map<{ [key in ChainflipAsset]: {} }, `${number}` | `0x${string}`>,
];

import { type ChainflipAsset } from '../common';

export type LendingPoolsExpandLoan = [
  loanId: `${number}` | `0x${string}`,
  extraAmountToBorrow: `${number}` | `0x${string}`,
  extraCollateral: Map<{ [key in ChainflipAsset]: {} }, `${number}` | `0x${string}`>,
];

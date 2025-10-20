import { type PalletCfFundingRedemptionAmount } from '../common';

export type FundingRedeem = [
  amount: PalletCfFundingRedemptionAmount,
  address: Uint8Array,
  executor: Uint8Array | null,
];

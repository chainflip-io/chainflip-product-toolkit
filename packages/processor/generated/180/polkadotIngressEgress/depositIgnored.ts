import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositIgnoredReason,
} from '../common';

export const polkadotIngressEgressDepositIgnored = z.object({
  depositAddress: hexString.nullish(),
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
  reason: palletCfIngressEgressDepositIgnoredReason,
});

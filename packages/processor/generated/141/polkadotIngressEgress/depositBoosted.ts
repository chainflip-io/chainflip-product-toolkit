import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const polkadotIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
});

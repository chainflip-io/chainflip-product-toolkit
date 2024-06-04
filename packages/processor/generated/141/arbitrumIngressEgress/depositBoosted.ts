import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const arbitrumIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
});

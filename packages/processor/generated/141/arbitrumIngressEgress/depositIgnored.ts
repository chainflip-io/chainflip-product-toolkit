import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositIgnoredReason,
} from '../common';

export const arbitrumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  reason: palletCfIngressEgressDepositIgnoredReason,
});

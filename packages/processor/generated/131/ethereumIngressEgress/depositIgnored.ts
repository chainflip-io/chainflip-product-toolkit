import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositIgnoredReason,
} from '../common';

export const ethereumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  reason: palletCfIngressEgressDepositIgnoredReason,
});

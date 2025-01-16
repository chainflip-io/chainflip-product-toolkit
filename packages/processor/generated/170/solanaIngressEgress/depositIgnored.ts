import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsSolAsset,
  hexString,
  numberOrHex,
  palletCfSolanaIngressEgressDepositIgnoredReason,
} from '../common';

export const solanaIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  reason: palletCfSolanaIngressEgressDepositIgnoredReason,
});

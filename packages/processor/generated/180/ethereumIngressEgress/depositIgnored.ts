import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositIgnoredReason,
} from '../common';

export const ethereumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString.nullish(),
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  reason: palletCfIngressEgressDepositIgnoredReason,
});

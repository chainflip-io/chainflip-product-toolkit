import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const ethereumIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
  channelId: numberOrHex,
});

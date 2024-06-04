import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const polkadotIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
  channelId: numberOrHex,
});

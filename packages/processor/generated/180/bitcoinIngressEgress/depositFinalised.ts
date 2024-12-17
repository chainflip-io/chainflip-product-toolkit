import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxo,
  cfChainsDepositOriginType,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const bitcoinIngressEgressDepositFinalised = z.object({
  depositAddress: cfChainsBtcScriptPubkey.nullish(),
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
  ingressFee: numberOrHex,
  maxBoostFeeBps: z.number(),
  action: palletCfIngressEgressDepositAction,
  channelId: numberOrHex.nullish(),
  originType: cfChainsDepositOriginType,
});

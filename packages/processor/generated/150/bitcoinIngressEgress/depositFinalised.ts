import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const bitcoinIngressEgressDepositFinalised = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
  ingressFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
  channelId: numberOrHex,
});

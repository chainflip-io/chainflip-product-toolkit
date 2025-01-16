import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxo,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositAction,
} from '../common';

export const bitcoinIngressEgressDepositFinalised = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
  ingressFee: numberOrHex,
  action: palletCfBitcoinIngressEgressDepositAction,
  channelId: numberOrHex,
});

import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfIngressEgressDepositAction,
} from '../common';

export const bitcoinIngressEgressDepositBoosted = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: cfChainsBtcUtxoId,
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfIngressEgressDepositAction,
});

import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfIngressEgressDepositIgnoredReason,
} from '../common';

export const bitcoinIngressEgressDepositIgnored = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
  reason: palletCfIngressEgressDepositIgnoredReason,
});

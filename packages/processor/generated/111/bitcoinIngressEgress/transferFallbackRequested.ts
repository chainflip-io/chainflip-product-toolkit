import { z } from 'zod';
import { cfChainsBtcScriptPubkey, cfPrimitivesChainsAssetsBtcAsset, numberOrHex } from '../common';

export const bitcoinIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsBtcScriptPubkey,
  broadcastId: z.number(),
});

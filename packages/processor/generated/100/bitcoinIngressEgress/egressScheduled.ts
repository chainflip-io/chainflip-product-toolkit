import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfPrimitivesChainsAssetsBtcAsset,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';

export const bitcoinIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsBtcScriptPubkey,
});

import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, hexString, numberOrHex } from '../common';

export const solanaIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
  broadcastId: z.number(),
});

import { z } from 'zod';
import { cfPrimitivesChainsAssetsArbAsset, hexString, numberOrHex } from '../common';

export const arbitrumIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
  broadcastId: z.number(),
});

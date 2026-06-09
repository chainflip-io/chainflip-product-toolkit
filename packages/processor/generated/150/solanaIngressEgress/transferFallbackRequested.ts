import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
  broadcastId: z.number(),
});

export const solanaIngressEgressTransferFallbackRequestedEvent = defineEvent(
  'SolanaIngressEgress.TransferFallbackRequested',
  solanaIngressEgressTransferFallbackRequested,
);

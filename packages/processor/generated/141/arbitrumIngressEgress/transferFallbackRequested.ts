import { z } from 'zod';
import { cfPrimitivesChainsAssetsArbAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
  broadcastId: z.number(),
});

export const arbitrumIngressEgressTransferFallbackRequestedEvent = defineEvent(
  'ArbitrumIngressEgress.TransferFallbackRequested',
  arbitrumIngressEgressTransferFallbackRequested,
);

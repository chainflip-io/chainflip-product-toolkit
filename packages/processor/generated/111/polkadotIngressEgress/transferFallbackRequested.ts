import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
  broadcastId: z.number(),
});

export const polkadotIngressEgressTransferFallbackRequestedEvent = defineEvent(
  'PolkadotIngressEgress.TransferFallbackRequested',
  polkadotIngressEgressTransferFallbackRequested,
);

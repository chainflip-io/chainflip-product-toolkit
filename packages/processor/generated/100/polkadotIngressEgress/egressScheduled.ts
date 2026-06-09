import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  cfPrimitivesChainsForeignChain,
  hexString,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

export const polkadotIngressEgressEgressScheduledEvent = defineEvent(
  'PolkadotIngressEgress.EgressScheduled',
  polkadotIngressEgressEgressScheduled,
);

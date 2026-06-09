import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  cfPrimitivesChainsForeignChain,
  hexString,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

export const ethereumIngressEgressEgressScheduledEvent = defineEvent(
  'EthereumIngressEgress.EgressScheduled',
  ethereumIngressEgressEgressScheduled,
);

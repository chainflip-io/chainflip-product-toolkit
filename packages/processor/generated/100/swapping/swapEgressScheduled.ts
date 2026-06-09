import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsAnyAsset,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapEgressScheduled = z.object({
  swapId: numberOrHex,
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
});

export const swappingSwapEgressScheduledEvent = defineEvent(
  'Swapping.SwapEgressScheduled',
  swappingSwapEgressScheduled,
);

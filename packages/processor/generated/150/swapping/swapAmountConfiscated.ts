import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapAmountConfiscated = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  totalAmount: numberOrHex,
  confiscatedAmount: numberOrHex,
});

export const swappingSwapAmountConfiscatedEvent = defineEvent(
  'Swapping.SwapAmountConfiscated',
  swappingSwapAmountConfiscated,
);

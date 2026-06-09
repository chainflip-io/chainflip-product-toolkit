import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapExecuted = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  depositAmount: numberOrHex,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  egressAmount: numberOrHex,
  intermediateAmount: numberOrHex.nullish(),
});

export const swappingSwapExecutedEvent = defineEvent('Swapping.SwapExecuted', swappingSwapExecuted);

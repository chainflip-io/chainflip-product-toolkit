import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsAnyAsset,
  cfTraitsLiquiditySwapType,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapExecuted = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  depositAmount: numberOrHex,
  swapInput: numberOrHex,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  egressAmount: numberOrHex,
  swapOutput: numberOrHex,
  intermediateAmount: numberOrHex.nullish(),
  swapType: cfTraitsLiquiditySwapType,
});

export const swappingSwapExecutedEvent = defineEvent('Swapping.SwapExecuted', swappingSwapExecuted);

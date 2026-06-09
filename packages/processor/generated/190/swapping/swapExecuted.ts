import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapExecuted = z.object({
  swapRequestId: numberOrHex,
  swapId: numberOrHex,
  inputAsset: cfPrimitivesChainsAssetsAnyAsset,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  inputAmount: numberOrHex,
  networkFee: numberOrHex,
  brokerFee: numberOrHex,
  intermediateAmount: numberOrHex.nullish(),
  outputAmount: numberOrHex,
});

export const swappingSwapExecutedEvent = defineEvent('Swapping.SwapExecuted', swappingSwapExecuted);

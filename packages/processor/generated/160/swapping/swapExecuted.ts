import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const swappingSwapExecuted = z.object({
  swapRequestId: numberOrHex,
  swapId: numberOrHex,
  inputAsset: cfPrimitivesChainsAssetsAnyAsset,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  inputAmount: numberOrHex,
  networkFee: numberOrHex,
  intermediateAmount: numberOrHex.nullish(),
  outputAmount: numberOrHex,
});

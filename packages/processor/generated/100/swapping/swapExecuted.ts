import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const swappingSwapExecuted = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  depositAmount: numberOrHex,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  egressAmount: numberOrHex,
  intermediateAmount: numberOrHex.nullish(),
});

import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsAnyAsset,
  cfTraitsLiquiditySwapType,
  numberOrHex,
} from '../common';

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

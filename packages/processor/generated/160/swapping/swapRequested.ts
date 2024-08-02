import { z } from 'zod';
import {
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  cfTraitsSwappingSwapRequestTypeGeneric,
  numberOrHex,
} from '../common';

export const swappingSwapRequested = z.object({
  swapRequestId: numberOrHex,
  inputAsset: cfPrimitivesChainsAssetsAnyAsset,
  inputAmount: numberOrHex,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  brokerFee: numberOrHex,
  origin: cfChainsSwapOrigin,
  requestType: cfTraitsSwappingSwapRequestTypeGeneric,
});

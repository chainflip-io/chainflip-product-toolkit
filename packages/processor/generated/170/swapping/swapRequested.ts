import { z } from 'zod';
import {
  cfChainsChannelRefundParametersGenericEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  cfPrimitivesDcaParameters,
  cfTraitsSwappingSwapRequestTypeGeneric,
  numberOrHex,
} from '../common';

export const swappingSwapRequested = z.object({
  swapRequestId: numberOrHex,
  inputAsset: cfPrimitivesChainsAssetsAnyAsset,
  inputAmount: numberOrHex,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  origin: cfChainsSwapOrigin,
  requestType: cfTraitsSwappingSwapRequestTypeGeneric,
  refundParameters: cfChainsChannelRefundParametersGenericEncodedAddress.nullish(),
  dcaParameters: cfPrimitivesDcaParameters.nullish(),
});

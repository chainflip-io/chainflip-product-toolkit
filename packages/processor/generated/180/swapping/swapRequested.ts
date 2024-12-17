import { z } from 'zod';
import {
  cfChainsChannelRefundParametersGenericEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesBeneficiaryAccountId32,
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
  brokerFees: z.array(cfPrimitivesBeneficiaryAccountId32),
  refundParameters: cfChainsChannelRefundParametersGenericEncodedAddress.nullish(),
  dcaParameters: cfPrimitivesDcaParameters.nullish(),
});

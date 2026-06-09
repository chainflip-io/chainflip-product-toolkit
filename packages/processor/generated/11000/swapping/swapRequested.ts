import { z } from 'zod';
import {
  cfChainsRefundParametersExtendedGenericEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesBeneficiaryAccountId32,
  cfPrimitivesChainsAssetsAnyAsset,
  cfPrimitivesDcaParameters,
  cfTraitsSwappingSwapRequestTypeGeneric,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapRequested = z.object({
  swapRequestId: numberOrHex,
  inputAsset: cfPrimitivesChainsAssetsAnyAsset,
  inputAmount: numberOrHex,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  origin: cfChainsSwapOrigin,
  requestType: cfTraitsSwappingSwapRequestTypeGeneric,
  brokerFees: z.array(cfPrimitivesBeneficiaryAccountId32),
  refundParameters: cfChainsRefundParametersExtendedGenericEncodedAddress.nullish(),
  dcaParameters: cfPrimitivesDcaParameters.nullish(),
});

export const swappingSwapRequestedEvent = defineEvent(
  'Swapping.SwapRequested',
  swappingSwapRequested,
);

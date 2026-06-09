import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapAmountTooLow = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
  origin: cfChainsSwapOrigin,
});

export const swappingSwapAmountTooLowEvent = defineEvent(
  'Swapping.SwapAmountTooLow',
  swappingSwapAmountTooLow,
);

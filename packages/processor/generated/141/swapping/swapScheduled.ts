import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  cfTraitsLiquiditySwapType,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapScheduled = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  depositAmount: numberOrHex,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  origin: cfChainsSwapOrigin,
  swapType: cfTraitsLiquiditySwapType,
  brokerCommission: numberOrHex.nullish(),
  brokerFee: numberOrHex.nullish(),
  executeAt: z.number(),
});

export const swappingSwapScheduledEvent = defineEvent(
  'Swapping.SwapScheduled',
  swappingSwapScheduled,
);

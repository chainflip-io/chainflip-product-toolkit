import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfSwappingSwapType,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapScheduled = z.object({
  swapId: numberOrHex,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  depositAmount: numberOrHex,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  origin: cfChainsSwapOrigin,
  swapType: palletCfSwappingSwapType,
  brokerCommission: numberOrHex.nullish(),
});

export const swappingSwapScheduledEvent = defineEvent(
  'Swapping.SwapScheduled',
  swappingSwapScheduled,
);

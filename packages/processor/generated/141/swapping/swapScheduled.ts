import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsSwapOrigin,
  cfPrimitivesChainsAssetsAnyAsset,
  cfTraitsLiquiditySwapType,
  numberOrHex,
} from '../common';

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

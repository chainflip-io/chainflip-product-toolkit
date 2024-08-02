import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex, spRuntimeDispatchError } from '../common';

export const swappingRefundEgressIgnored = z.object({
  swapId: numberOrHex,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
  reason: spRuntimeDispatchError,
});

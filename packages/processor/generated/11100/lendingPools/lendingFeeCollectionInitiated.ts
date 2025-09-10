import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsLendingFeeCollectionInitiated = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  swapRequestId: numberOrHex,
});

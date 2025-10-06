import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsLendingPoolFeeSwapInitiated = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  swapRequestId: numberOrHex,
});

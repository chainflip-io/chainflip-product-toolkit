import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const swappingMinimumChunkSizeSet = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
});

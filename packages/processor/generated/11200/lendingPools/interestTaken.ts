import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsInterestTaken = z.object({
  loanId: numberOrHex,
  poolInterest: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  networkInterest: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  brokerInterest: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  lowLtvPenalty: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
});

import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsLoanSettled = z.object({
  loanId: numberOrHex,
  totalFees: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
});

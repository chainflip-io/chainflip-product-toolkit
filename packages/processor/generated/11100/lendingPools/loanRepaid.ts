import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsLoanRepaid = z.object({
  loanId: numberOrHex,
  amount: numberOrHex,
  liquidationFees: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
});

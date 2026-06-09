import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLoanRepaid = z.object({
  loanId: numberOrHex,
  amount: numberOrHex,
  liquidationFees: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
});

export const lendingPoolsLoanRepaidEvent = defineEvent(
  'LendingPools.LoanRepaid',
  lendingPoolsLoanRepaid,
);

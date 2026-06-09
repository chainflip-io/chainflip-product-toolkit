import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLoanSettled = z.object({
  loanId: numberOrHex,
  totalFees: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
});

export const lendingPoolsLoanSettledEvent = defineEvent(
  'LendingPools.LoanSettled',
  lendingPoolsLoanSettled,
);

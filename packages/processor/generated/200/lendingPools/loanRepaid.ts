import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLoanRepaid = z.object({ loanId: numberOrHex, amount: numberOrHex });

export const lendingPoolsLoanRepaidEvent = defineEvent(
  'LendingPools.LoanRepaid',
  lendingPoolsLoanRepaid,
);

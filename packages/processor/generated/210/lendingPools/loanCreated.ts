import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLoanCreated = z.object({
  loanId: numberOrHex,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  borrowerId: accountId,
  principalAmount: numberOrHex,
});

export const lendingPoolsLoanCreatedEvent = defineEvent(
  'LendingPools.LoanCreated',
  lendingPoolsLoanCreated,
);

import { z } from 'zod';
import {
  accountId,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfLendingPoolsGeneralLendingLoanType,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLoanCreated = z.object({
  loanId: numberOrHex,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  loanType: palletCfLendingPoolsGeneralLendingLoanType,
  principalAmount: numberOrHex,
  brokerId: accountId.nullish(),
});

export const lendingPoolsLoanCreatedEvent = defineEvent(
  'LendingPools.LoanCreated',
  lendingPoolsLoanCreated,
);

import { type CfTraitsLendingRepaymentAmount } from '../common';

export type LendingPoolsMakeRepayment = [
  loanId: `${number}` | `0x${string}`,
  amount: CfTraitsLendingRepaymentAmount,
];

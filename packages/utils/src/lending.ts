import BigNumber from 'bignumber.js';
import { bigintMax } from './number.js';

// Parts per million to basis points
export const ppmToBps = (ppmAmount: number) => Math.trunc(ppmAmount / 100);
// Parts per million to decimal
export const ppmToDecimal = (ppmAmount: number) => ppmAmount / 1_000_000;

export const calculateLoanToValueBps = ({
  totalBorrowAmountUsd,
  totalCollateralBalanceUsd,
}: {
  totalBorrowAmountUsd: number;
  totalCollateralBalanceUsd: number;
}) => {
  if (totalCollateralBalanceUsd === 0) return 0;
  return Math.trunc((totalBorrowAmountUsd / totalCollateralBalanceUsd) * 10_000);
};

export const calculateBorrowPowerUsedBps = ({
  totalBorrowAmountUsd,
  totalCollateralBalanceUsd,
  thresholdDecimal,
}: {
  totalBorrowAmountUsd: number;
  totalCollateralBalanceUsd: number;
  thresholdDecimal: number; // 0.80 for example
}) => {
  if (totalCollateralBalanceUsd === 0 || thresholdDecimal === 0) return 0;
  return Math.trunc(
    (totalBorrowAmountUsd / (totalCollateralBalanceUsd * thresholdDecimal)) * 10_000,
  );
};

export const calculateTotalEffectiveBorrowableAmount = ({
  totalAmount,
  totalAvailableAmount,
  utilisationCapBps,
}: {
  totalAmount: bigint;
  totalAvailableAmount: bigint;
  utilisationCapBps?: number | null; // 10_000 for 100%, for example
}) => {
  const totalBorrowedAmount = totalAmount - totalAvailableAmount;
  const totalEffectiveBorrowableAmount = new BigNumber(totalAmount)
    .multipliedBy(utilisationCapBps ?? 10_000)
    .div(10_000)
    .toFixed();

  return bigintMax(BigInt(totalEffectiveBorrowableAmount) - totalBorrowedAmount, 0n);
};

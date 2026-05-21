import BigNumber from 'bignumber.js';
import { bigintMax } from './number.js';

// Parts per million to basis points
export const ppmToBps = (ppmAmount: number) => Math.trunc(ppmAmount / 100);

export const calculateTotalEffectiveBorrowableAmount = ({
  totalAmount,
  totalAvailableAmount,
  utilisationCap,
}: {
  totalAmount: bigint;
  totalAvailableAmount: bigint;
  utilisationCap?: number | null;
}) => {
  const totalBorrowedAmount = totalAmount - totalAvailableAmount;
  const totalEffectiveBorrowableAmount = new BigNumber(totalAmount)
    .multipliedBy(ppmToBps(utilisationCap ?? 1_000_000))
    .div(10_000)
    .toFixed();

  return bigintMax(BigInt(totalEffectiveBorrowableAmount) - totalBorrowedAmount, 0n);
};

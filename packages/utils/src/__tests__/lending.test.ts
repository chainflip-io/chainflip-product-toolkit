import { describe, expect, it } from 'vitest';
import {
  calculateBorrowPowerUsedBps,
  calculateLoanToValueBps,
  calculateTotalEffectiveBorrowableAmount,
  ppmToBps,
  ppmToDecimal,
} from '../lending';

describe(ppmToBps, () => {
  it('converts 100% utilisation (1_000_000 ppm) to 10_000 bps', () => {
    expect(ppmToBps(1_000_000)).toBe(10_000);
  });

  it('converts 50% utilisation (500_000 ppm) to 5_000 bps', () => {
    expect(ppmToBps(500_000)).toBe(5_000);
  });

  it('converts 1% utilisation (10_000 ppm) to 100 bps', () => {
    expect(ppmToBps(10_000)).toBe(100);
  });

  it('truncates fractional bps', () => {
    expect(ppmToBps(150)).toBe(1);
    expect(ppmToBps(99)).toBe(0);
  });

  it('returns 0 for 0 ppm', () => {
    expect(ppmToBps(0)).toBe(0);
  });
});

describe(ppmToDecimal, () => {
  it('converts 100% utilisation (1_000_000 ppm) to 1', () => {
    expect(ppmToDecimal(1_000_000)).toBe(1);
  });

  it('converts 50% utilisation (500_000 ppm) to 0.5', () => {
    expect(ppmToDecimal(500_000)).toBe(0.5);
  });

  it('converts 1% utilisation (10_000 ppm) to 0.01', () => {
    expect(ppmToDecimal(10_000)).toBe(0.01);
  });

  it('converts 1 ppm to 0.000001', () => {
    expect(ppmToDecimal(1)).toBe(0.000001);
  });

  it('returns 0 for 0 ppm', () => {
    expect(ppmToDecimal(0)).toBe(0);
  });
});

describe(calculateTotalEffectiveBorrowableAmount, () => {
  it('returns available amount when no utilisation cap is set', () => {
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 1_000n,
        totalAvailableAmount: 600n,
      }),
    ).toBe(600n);
  });

  it('returns available amount when utilisation cap is null', () => {
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 2_000n,
        totalAvailableAmount: 800n,
        utilisationCap: null,
      }),
    ).toBe(800n);
  });

  it('caps borrowable amount based on utilisation cap', () => {
    // 50% cap: effective = 1000 * 0.5 = 500, borrowed = 400, borrowable = 100
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 1_000n,
        totalAvailableAmount: 600n,
        utilisationCap: 500_000,
      }),
    ).toBe(100n);
  });

  it('returns 0n when already at or over the utilisation cap', () => {
    // 50% cap: effective = 500, borrowed = 600, would be negative → 0n
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 1_000n,
        totalAvailableAmount: 400n,
        utilisationCap: 500_000,
      }),
    ).toBe(0n);
  });

  it('returns 0n when pool is fully borrowed', () => {
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 1_000n,
        totalAvailableAmount: 0n,
        utilisationCap: 1_000_000,
      }),
    ).toBe(0n);
  });

  it('returns total amount when pool is empty and no cap', () => {
    expect(
      calculateTotalEffectiveBorrowableAmount({
        totalAmount: 5_000n,
        totalAvailableAmount: 5_000n,
      }),
    ).toBe(5_000n);
  });
});

describe('calculateLoanToValueBps', () => {
  it('returns 0 if totalCollateralBalanceUsd is 0', () => {
    expect(
      calculateLoanToValueBps({ totalBorrowAmountUsd: 100, totalCollateralBalanceUsd: 0 }),
    ).toBe(0);
  });

  it('calculates loan to value in bps', () => {
    expect(
      calculateLoanToValueBps({ totalBorrowAmountUsd: 500, totalCollateralBalanceUsd: 1000 }),
    ).toBe(5000);
    expect(
      calculateLoanToValueBps({ totalBorrowAmountUsd: 1000, totalCollateralBalanceUsd: 1000 }),
    ).toBe(10000);
    expect(
      calculateLoanToValueBps({ totalBorrowAmountUsd: 0, totalCollateralBalanceUsd: 1000 }),
    ).toBe(0);
  });

  it('handles floating point values', () => {
    expect(
      calculateLoanToValueBps({ totalBorrowAmountUsd: 250.5, totalCollateralBalanceUsd: 1000 }),
    ).toBeCloseTo(2505);
  });
});

describe('calculateBorrowPowerUsedBps', () => {
  it('returns 0 if totalCollateralBalanceUsd is 0', () => {
    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 100,
        totalCollateralBalanceUsd: 0,
        thresholdDecimal: 0.79,
      }),
    ).toBe(0);
  });

  it('returns 0 if liquidationThresholdDecimal is 0', () => {
    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 100,
        totalCollateralBalanceUsd: 1000,
        thresholdDecimal: 0,
      }),
    ).toBe(0);
  });

  it('calculates borrow power used in bps', () => {
    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 850,
        totalCollateralBalanceUsd: 1000,
        thresholdDecimal: 0.79,
      }),
    ).toBe(10759);

    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 425,
        totalCollateralBalanceUsd: 1000,
        thresholdDecimal: 0.79,
      }),
    ).toBe(5379);

    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 0,
        totalCollateralBalanceUsd: 1000,
        thresholdDecimal: 0.79,
      }),
    ).toBe(0);
  });

  it('handles floating point values', () => {
    expect(
      calculateBorrowPowerUsedBps({
        totalBorrowAmountUsd: 123.45,
        totalCollateralBalanceUsd: 1000,
        thresholdDecimal: 0.79,
      }),
    ).toBe(1562);
  });
});

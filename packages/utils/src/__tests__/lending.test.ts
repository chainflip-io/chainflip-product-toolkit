import { describe, expect, it } from 'vitest';
import { calculateTotalEffectiveBorrowableAmount, ppmToBps } from '../lending';

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

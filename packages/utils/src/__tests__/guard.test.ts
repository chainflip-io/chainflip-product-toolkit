import { describe, expect, it } from 'vitest';
import { isFullfilled, isNotNullish, isNullish, isRejected, isTruthy } from '../guard';

describe(isNotNullish, () => {
  it('returns true for non-nullish values', () => {
    expect(isNotNullish(0)).toBe(true);
    expect(isNotNullish('')).toBe(true);
    expect(isNotNullish(false)).toBe(true);
    expect(isNotNullish({})).toBe(true);
    expect(isNotNullish([])).toBe(true);
  });
});

describe(isNullish, () => {
  it('returns true for nullish values', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('returns false for non-nullish values', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish([])).toBe(false);
  });
});

describe('isTruthy', () => {
  it('returns true for truthy values', () => {
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy({})).toBe(true);
    expect(isTruthy([])).toBe(true);
  });

  it('returns false for falsy values', () => {
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy('')).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
  });
});

describe('isFullfilled', () => {
  it('should return true for a fulfilled promise result', () => {
    const fulfilledResult: PromiseFulfilledResult<string> = {
      status: 'fulfilled',
      value: 'Test value',
    };
    expect(isFullfilled(fulfilledResult)).toBe(true);
  });
  it('should return false for a rejected promise result', () => {
    const rejectedResult: PromiseRejectedResult = {
      status: 'rejected',
      reason: new Error('Test error'),
    };
    expect(isFullfilled(rejectedResult)).toBe(false);
  });
});

describe('isRejected', () => {
  it('should return true for a fulfilled promise result', () => {
    const fulfilledResult: PromiseFulfilledResult<string> = {
      status: 'fulfilled',
      value: 'Test value',
    };
    expect(isRejected(fulfilledResult)).toBe(false);
  });
  it('should return false for a rejected promise result', () => {
    const rejectedResult: PromiseRejectedResult = {
      status: 'rejected',
      reason: new Error('Test error'),
    };
    expect(isRejected(rejectedResult)).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { isNotNullish, isNullish } from '../guard';

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

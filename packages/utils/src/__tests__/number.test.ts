import { describe, expect, it } from 'vitest';
import { bigintMax, bigintMin, hexEncodeNumber } from '../number';

describe(hexEncodeNumber, () => {
  it('encodes a number to a hex string', () => {
    expect(hexEncodeNumber(42)).toBe('0x2a');
  });
});

describe(bigintMin, () => {
  it('returns the single value when given one argument', () => {
    expect(bigintMin(5n)).toBe(5n);
  });

  it('returns the smaller of two values', () => {
    expect(bigintMin(3n, 7n)).toBe(3n);
    expect(bigintMin(7n, 3n)).toBe(3n);
  });

  it('returns the value when both are equal', () => {
    expect(bigintMin(4n, 4n)).toBe(4n);
  });

  it('handles negative values', () => {
    expect(bigintMin(-1n, 1n)).toBe(-1n);
    expect(bigintMin(-5n, -2n)).toBe(-5n);
  });

  it('returns the minimum across multiple arguments', () => {
    expect(bigintMin(10n, 3n, 7n, 1n, 5n)).toBe(1n);
  });
});

describe(bigintMax, () => {
  it('returns the single value when given one argument', () => {
    expect(bigintMax(5n)).toBe(5n);
  });

  it('returns the larger of two values', () => {
    expect(bigintMax(3n, 7n)).toBe(7n);
    expect(bigintMax(7n, 3n)).toBe(7n);
  });

  it('returns the value when both are equal', () => {
    expect(bigintMax(4n, 4n)).toBe(4n);
  });

  it('handles negative values', () => {
    expect(bigintMax(-1n, 1n)).toBe(1n);
    expect(bigintMax(-5n, -2n)).toBe(-2n);
  });

  it('returns the maximum across multiple arguments', () => {
    expect(bigintMax(10n, 3n, 7n, 1n, 5n)).toBe(10n);
  });
});

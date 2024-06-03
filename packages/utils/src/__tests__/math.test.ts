import { describe, expect, it } from 'vitest';
import { average, sum } from '../math';

describe(average, () => {
  it('calculates the average of an array of numbers', () => {
    expect(average([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('returns NaN for an empty array', () => {
    expect(average([])).toEqual(NaN);
  });
});

describe(sum, () => {
  it('calculates the sum of an array of numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
  });
});

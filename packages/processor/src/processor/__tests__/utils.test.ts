import { describe, it, expect } from 'vitest';
import { parseSemver } from '../utils';

describe(parseSemver, () => {
  it.each([
    ['chainflip-node@120', '1.2.0'],
    ['chainflip-node@141', '1.4.1'],
    ['chainflip-node@10800', '1.8.0'],
    ['chainflip-node@10803', '1.8.3'],
  ])('returns the spec number', (specId, specNumber) => {
    expect(parseSemver(specId)).toBe(specNumber);
  });

  it('throws an error for incorrect spec ids', () => {
    expect(() => parseSemver('chainflip-node')).toThrowError();
    expect(() => parseSemver('140')).toThrowError();
  });
});

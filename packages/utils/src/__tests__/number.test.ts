import { describe, expect, it } from 'vitest';
import { hexEncodeNumber } from '../number';

describe(hexEncodeNumber, () => {
  it('encodes a number to a hex string', () => {
    expect(hexEncodeNumber(42)).toBe('0x2a');
  });
});

import { describe, expect, it } from 'vitest';
import { numberOrHex } from '../parsers';

describe('parsers', () => {
  describe('numberOrHex', () => {
    it.each([1, '0x1'])('transforms %s into a bigint', (value) => {
      expect(numberOrHex.parse(value)).toBe(BigInt(value));
    });
  });
});

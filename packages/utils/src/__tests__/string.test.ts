import { describe, it, expect } from 'vitest';
import { toLowerCase, toUpperCase } from '../string.ts';

describe(toUpperCase, () => {
  it('should convert to uppercase', () => {
    expect(toUpperCase('hello')).toBe('HELLO');
  });
});

describe(toLowerCase, () => {
  it('should convert to lowercase', () => {
    expect(toLowerCase('HELLO')).toBe('hello');
  });
});

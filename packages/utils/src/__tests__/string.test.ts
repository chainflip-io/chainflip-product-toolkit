import { describe, it, expect } from 'vitest';
import { capitalize, isHex, split, toLowerCase, toUpperCase, uncapitalize } from '../string';

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

describe(split, () => {
  it('splits the string', () => {
    expect(split('hello world', ' ')).toEqual(['hello', 'world']);
  });
});

describe(capitalize, () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
});

describe(uncapitalize, () => {
  it('uncapitalizes the first letter', () => {
    expect(uncapitalize('Hello')).toBe('hello');
  });
});

describe(isHex, () => {
  it('checks if the string is a hex string', () => {
    expect(isHex('0x123')).toBe(true);
    expect(isHex('123')).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import {
  capitalize,
  isHex,
  split,
  toLowerCase,
  toUpperCase,
  trimPrefix,
  trimSuffix,
  uncapitalize,
} from '../string';

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

describe(trimPrefix, () => {
  it('removes a prefix', () => {
    const trim0x = trimPrefix('0x');
    expect(trim0x('0x123')).toBe('123');
    expect(trimPrefix('0x', '0x123')).toBe('123');
  });
});

describe(trimSuffix, () => {
  it('removes a suffix', () => {
    const trimWorld = trimSuffix('world');
    expect(trimWorld('hello world')).toBe('hello ');
    expect(trimSuffix('world', 'hello world')).toBe('hello ');
  });
});

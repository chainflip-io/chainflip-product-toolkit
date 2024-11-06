import { describe, it, expect } from 'vitest';
import {
  abbreviate,
  capitalize,
  isHex,
  isInteger,
  split,
  toLowerCase,
  toUpperCase,
  truncateString,
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

describe('isInteger', () => {
  it.each([
    ['123', true],
    ['abc', false],
    ['12.32', false],
    ['NaN', false],
  ])('checks if the string is an integer', (input, expected) => {
    expect(isInteger(input)).toBe(expected);
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

describe('abbreviate', () => {
  it.each([
    ['0x1234567890abcdef', '0x12…cdef'],
    ['0x1234567890abcdef', '0x12. . .cdef', 4, true],
    ['0x1234567890abcdef', '0x…ef', 2],
    [null, ''],
  ])('abbreviates the string', (input, expected, ...args) => {
    expect(abbreviate(input, ...(args as any))).toBe(expected);
  });
});

describe('truncateString', () => {
  it.each([
    ['hello world', 'hello world'],
    ['hello world', 'hello world', 20],
    ['hello world', 'hello...', 5, true],
    ['0x123456789', '0x1234', 6, false],
  ])('truncates the string', (input, expected, ...args) => {
    expect(truncateString(input, ...(args as any))).toBe(expected);
  });
});

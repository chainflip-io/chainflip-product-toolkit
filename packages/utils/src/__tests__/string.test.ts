import { describe, it, expect } from 'vitest';
import { capitalize, split, toLowerCase, toUpperCase, uncapitalize } from '../string';

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

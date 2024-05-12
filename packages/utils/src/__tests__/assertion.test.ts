import { describe, expect, it } from 'vitest';
import { assert } from '../assertion.ts';

describe(assert, () => {
  it('should throw an error if the condition is falsy', () => {
    expect(() => assert(false)).toThrow('assertion failed');
  });

  it('should not throw an error if the condition is truthy', () => {
    expect(() => assert(true)).not.toThrow();
  });

  it('should throw an error with the given message', () => {
    expect(() => assert(false, 'custom message')).toThrow('custom message');
  });
});

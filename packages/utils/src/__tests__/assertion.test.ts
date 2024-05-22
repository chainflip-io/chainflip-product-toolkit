import { describe, expect, it } from 'vitest';
import { assert, assertType, unreachable } from '../assertion';

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

describe(assertType, () => {
  it.each([
    ['string', 'hello'],
    ['number', 42],
    ['bigint', BigInt(42)],
    ['boolean', true],
    ['symbol', Symbol()],
    ['object', {}],
    ['object', null],
    ['object', []],
    ['undefined', undefined],
  ] as const)('should not throw an error for %s', (type, value) => {
    expect(() => assertType(type, value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertType('string', 42)).toThrow('expected a "string"');
  });
});

describe(unreachable, () => {
  it('throws an error with the given message', () => {
    expect(() => unreachable(null as never, 'custom message')).toThrow('custom message');
  });

  it('throws an error with the default message', () => {
    expect(() => unreachable(null as never)).toThrow('unreachable');
  });
});

import { describe, expect, it } from 'vitest';
import {
  assert,
  assertBigInt,
  assertBoolean,
  assertNumber,
  assertObject,
  assertString,
  assertSymbol,
  assertUndefined,
  unreachable,
} from '../assertion';

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

describe(assertObject, () => {
  it.each([{}, null, []])('should not throw an error for objects', (value) => {
    expect(() => assertObject(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertObject(42)).toThrow('expected an "object", got "number"');
  });
});

describe(assertString, () => {
  it.each(['', 'string'])('should not throw an error for strings', (value) => {
    expect(() => assertString(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertString(42)).toThrow('expected a "string", got "number"');
  });
});

describe(assertNumber, () => {
  it.each([0, 42])('should not throw an error for numbers', (value) => {
    expect(() => assertNumber(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertNumber('42')).toThrow('expected a "number", got "string"');
  });
});

describe(assertBigInt, () => {
  it.each([0n, 42n])('should not throw an error for bigints', (value) => {
    expect(() => assertBigInt(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertBigInt(42)).toThrow('expected a "bigint", got "number"');
  });
});

describe(assertBoolean, () => {
  it.each([true, false])('should not throw an error for booleans', (value) => {
    expect(() => assertBoolean(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertBoolean(42)).toThrow('expected a "boolean", got "number"');
  });
});

describe(assertSymbol, () => {
  it.each([Symbol('foo'), Symbol.for('foo')])('should not throw an error for symbols', (value) => {
    expect(() => assertSymbol(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertSymbol(42)).toThrow('expected a "symbol", got "number"');
  });
});

describe(assertUndefined, () => {
  it.each([undefined])('should not throw an error for undefined', (value) => {
    expect(() => assertUndefined(value)).not.toThrow();
  });

  it('should throw an error for an invalid type', () => {
    expect(() => assertUndefined(42)).toThrow('expected "undefined", got "number"');
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

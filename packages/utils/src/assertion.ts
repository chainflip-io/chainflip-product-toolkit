import { isBigInt, isBoolean, isNumber, isObject, isString, isSymbol, isUndefined } from './guard';

export function assert(
  condition: unknown,
  message = 'assertion failed',
  Constructor = Error,
): asserts condition {
  if (!condition) {
    throw new Constructor(message);
  }
}

export function assertString(value: unknown, message?: string): asserts value is string {
  if (!isString(value)) {
    throw new TypeError(message ?? `expected a "string", got "${typeof value}"`);
  }
}

export function assertNumber(value: unknown, message?: string): asserts value is number {
  if (!isNumber(value)) {
    throw new TypeError(message ?? `expected a "number", got "${typeof value}"`);
  }
}

export function assertBigInt(value: unknown, message?: string): asserts value is bigint {
  if (!isBigInt(value)) {
    throw new TypeError(message ?? `expected a "bigint", got "${typeof value}"`);
  }
}

export function assertBoolean(value: unknown, message?: string): asserts value is boolean {
  if (!isBoolean(value)) {
    throw new TypeError(message ?? `expected a "boolean", got "${typeof value}"`);
  }
}

export function assertSymbol(value: unknown, message?: string): asserts value is symbol {
  if (!isSymbol(value)) {
    throw new TypeError(message ?? `expected a "symbol", got "${typeof value}"`);
  }
}

export function assertObject(value: unknown, message?: string): asserts value is object {
  if (!isObject(value)) {
    throw new TypeError(message ?? `expected an "object", got "${typeof value}"`);
  }
}

export function assertUndefined(value: unknown, message?: string): asserts value is undefined {
  if (!isUndefined(value)) {
    throw new TypeError(message ?? `expected "undefined", got "${typeof value}"`);
  }
}

export const unreachable = (x: never, message = 'unreachable'): never => {
  throw new Error(message);
};

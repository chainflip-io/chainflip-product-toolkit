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
  assert(isString(value), message ?? `expected a "string", got "${typeof value}"`);
}

export function assertNumber(value: unknown, message?: string): asserts value is number {
  assert(isNumber(value), message ?? `expected a "number", got "${typeof value}"`);
}

export function assertBigInt(value: unknown, message?: string): asserts value is bigint {
  assert(isBigInt(value), message ?? `expected a "bigint", got "${typeof value}"`);
}

export function assertBoolean(value: unknown, message?: string): asserts value is boolean {
  assert(isBoolean(value), message ?? `expected a "boolean", got "${typeof value}"`);
}

export function assertSymbol(value: unknown, message?: string): asserts value is symbol {
  assert(isSymbol(value), message ?? `expected a "symbol", got "${typeof value}"`);
}

export function assertObject(value: unknown, message?: string): asserts value is object {
  assert(isObject(value), message ?? `expected an "object", got "${typeof value}"`);
}

export function assertUndefined(value: unknown, message?: string): asserts value is undefined {
  assert(isUndefined(value), message ?? `expected "undefined", got "${typeof value}"`);
}

export const unreachable = (x: never, message = 'unreachable'): never => {
  throw new Error(message);
};

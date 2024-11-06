export type TypeMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  object: object;
  undefined: undefined;
};

const createIsGuard =
  <T extends keyof TypeMap>(type: T) =>
  (value: unknown): value is TypeMap[T] =>
    typeof value === type;

export const isString = createIsGuard('string');

export const isNumber = createIsGuard('number');

export const isBigInt = createIsGuard('bigint');

export const isBoolean = createIsGuard('boolean');

export const isSymbol = createIsGuard('symbol');

export const isObject = createIsGuard('object');

export const isUndefined = createIsGuard('undefined');

export const isNotNullish = <T>(value: T): value is NonNullable<T> => value != null;

export const isNullish = (value: unknown): value is null | undefined => value == null;

export const isTruthy = <T>(value: T | null | undefined): value is T => Boolean(value);

export const isFullfilled = <T>(
  value: PromiseSettledResult<T>,
): value is PromiseFulfilledResult<T> => value.status === 'fulfilled';

export const isRejected = <T>(value: PromiseSettledResult<T>): value is PromiseRejectedResult =>
  value.status === 'rejected';

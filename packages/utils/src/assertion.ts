export function assert(
  condition: unknown,
  message = 'assertion failed',
  Constructor = Error,
): asserts condition {
  if (!condition) {
    throw new Constructor(message);
  }
}

type TypeMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  object: object;
  undefined: undefined;
};

export function assertType<T extends keyof TypeMap>(
  type: T,
  value: unknown,
  message?: string,
): asserts value is TypeMap[T] {
  assert(typeof value === type, message ?? `expected a "${type}"`);
}

export const unreachable = (x: never, message = 'unreachable'): never => {
  throw new Error(message);
};

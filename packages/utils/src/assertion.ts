export function assert(condition: unknown, message = 'assertion failed'): asserts condition {
  if (!condition) {
    throw new Error(message);
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
): asserts value is TypeMap[T] {
  assert(typeof value === type, `expected a "${type}"`);
}

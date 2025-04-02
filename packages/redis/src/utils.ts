type SnakeToCamelCase<T extends string> = T extends `${infer P}_${infer S}`
  ? `${P}${Capitalize<SnakeToCamelCase<S>>}`
  : T;

export const snakeToCamelCase = <const T extends string>(str: T): SnakeToCamelCase<T> =>
  str.replace(/_(.)/g, (match, group: string) => group.toUpperCase()) as SnakeToCamelCase<T>;

type CamelCasedKeys<T> =
  T extends Record<string, unknown>
    ? { [K in keyof T as K extends string ? SnakeToCamelCase<K> : K]: CamelCasedKeys<T[K]> }
    : T extends (infer U)[]
      ? CamelCasedKeys<U>[]
      : T;

export const transformKeysToCamelCase = <T>(obj: T): CamelCasedKeys<T> => {
  if (obj == null || typeof obj !== 'object') return obj as CamelCasedKeys<T>;

  if (Array.isArray(obj)) return obj.map(transformKeysToCamelCase) as CamelCasedKeys<T>;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      snakeToCamelCase(key),
      transformKeysToCamelCase(value),
    ]),
  ) as CamelCasedKeys<T>;
};

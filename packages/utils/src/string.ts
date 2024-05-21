export const toUpperCase = <const T extends string>(str: T) => str.toUpperCase() as Uppercase<T>;

export const toLowerCase = <const T extends string>(str: T) => str.toLowerCase() as Lowercase<T>;

type Split<T extends string, D extends string> = T extends `${infer L}${D}${infer R}`
  ? [L, ...Split<R, D>]
  : [T];

export const split = <const T extends string, D extends string>(str: T, delimiter: D) =>
  str.split(delimiter) as Split<T, D>;

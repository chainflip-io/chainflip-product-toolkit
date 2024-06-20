import type { HexString } from './types';

export const toUpperCase = <const T extends string>(str: T) => str.toUpperCase() as Uppercase<T>;

export const toLowerCase = <const T extends string>(str: T) => str.toLowerCase() as Lowercase<T>;

export type Split<T extends string, D extends string> = T extends `${infer L}${D}${infer R}`
  ? [L, ...Split<R, D>]
  : [T];

export const split = <const T extends string, D extends string>(str: T, delimiter: D) =>
  str.split(delimiter) as Split<T, D>;

export const capitalize = <const T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>;

export const uncapitalize = <const T extends string>(str: T): Uncapitalize<T> =>
  `${str.charAt(0).toLowerCase()}${str.slice(1)}` as Uncapitalize<T>;

export const isHex = (str: string): str is HexString => /^0x[\da-f]+$/i.test(str);

export type TrimPrefix<T extends string, P extends string> = T extends `${P}${infer R}` ? R : T;

export function trimPrefix<const P extends string>(
  prefix: P,
): <const T extends string>(str: T) => TrimPrefix<T, P>;
export function trimPrefix<const T extends string, const P extends string>(
  prefix: P,
  string: T,
): TrimPrefix<T, P>;
export function trimPrefix<const T extends string, const P extends string>(arg0: T | P, arg1?: P) {
  const regex = new RegExp(`^${arg0}`);

  if (arg1 === undefined) {
    return <const P extends string>(str: P): TrimPrefix<T, P> =>
      str.replace(regex, '') as TrimPrefix<T, P>;
  }

  return arg1.replace(regex, '') as TrimPrefix<T, P>;
}

export type TrimSuffix<T extends string, S extends string> = T extends `${infer R}${S}` ? R : T;

export function trimSuffix<const S extends string>(
  suffix: S,
): <const T extends string>(str: T) => TrimSuffix<T, S>;
export function trimSuffix<const T extends string, const S extends string>(
  suffix: S,
  string: T,
): TrimSuffix<T, S>;
export function trimSuffix<const T extends string, const S extends string>(arg0: T | S, arg1?: S) {
  const regex = new RegExp(`${arg0}$`);

  if (arg1 === undefined) {
    return <const S extends string>(str: S): TrimSuffix<T, S> =>
      str.replace(regex, '') as TrimSuffix<T, S>;
  }

  return arg1.replace(regex, '') as TrimSuffix<T, S>;
}

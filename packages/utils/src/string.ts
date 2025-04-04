import type { HexString } from './types';

export const toUpperCase = <const T extends string>(str: T) => str.toUpperCase() as Uppercase<T>;

export const toLowerCase = <const T extends string>(str: T) => str.toLowerCase() as Lowercase<T>;

export const isInteger = (string: string): boolean => /^\d+$/.test(string);

type Split<T extends string, D extends string> = T extends `${infer L}${D}${infer R}`
  ? [L, ...Split<R, D>]
  : [T];

export const split = <const T extends string, D extends string>(str: T, delimiter: D) =>
  str.split(delimiter) as Split<T, D>;

export const capitalize = <const T extends string>(str: T) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>;

export const uncapitalize = <const T extends string>(str: T): Uncapitalize<T> =>
  `${str.charAt(0).toLowerCase()}${str.slice(1)}` as Uncapitalize<T>;

export const isHex = (str: string): str is HexString => /^0x[\da-f]+$/i.test(str);

export const isBytes = (str: string) => /^(0x)?[\da-f]*$/i.test(str) && str.length % 2 === 0;

// eg: 0x...123
export const abbreviate = (
  text: string | undefined | null,
  showLength = 4,
  space = false,
): string => {
  if (typeof text !== 'string') return '';
  const leftPart = text.slice(0, showLength);
  const rightPart = text.slice(text.length - showLength);

  return [leftPart, rightPart].join(space ? '. . .' : '…');
};

// eg: 0x1245...
export const truncateString = (string: string, numCharacters = 20, ellipsis = true): string => {
  if (string.length < numCharacters) return string;

  let slicedString = string.slice(0, numCharacters);
  if (ellipsis) {
    slicedString += '...';
  }
  return slicedString;
};

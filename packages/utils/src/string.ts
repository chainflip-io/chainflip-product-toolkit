export const toUpperCase = <const T extends string>(str: T) => str.toUpperCase() as Uppercase<T>;

export const toLowerCase = <const T extends string>(str: T) => str.toLowerCase() as Lowercase<T>;

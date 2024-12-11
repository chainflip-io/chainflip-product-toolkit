import { decodeBytesWithCharset, encodeBytesWithCharset } from './bytes';

export const CHARSET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const encode = (bytes: Uint8Array | number[]): string =>
  encodeBytesWithCharset(bytes, CHARSET);

export const decode = (input: string): Uint8Array => decodeBytesWithCharset(input, CHARSET);

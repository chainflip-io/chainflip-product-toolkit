import { decodeBytesWithCharset, encodeBytesWithCharset } from './bytes';

const charset = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const encode = (bytes: Uint8Array | number[]): string =>
  encodeBytesWithCharset(bytes, charset);

export const decode = (input: string): number[] => decodeBytesWithCharset(input, charset);

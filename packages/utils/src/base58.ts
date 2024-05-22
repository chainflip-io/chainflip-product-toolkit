import { decodeWithCharset, encodeWithCharset } from './encoding';

const charset = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const encode = (bytes: Uint8Array | number[]): string => encodeWithCharset(bytes, charset);

export const decode = (input: string): number[] => decodeWithCharset(input, charset);

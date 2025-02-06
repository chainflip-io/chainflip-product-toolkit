import { decodeBytesWithCharset, encodeBytesWithCharset } from './bytes';
import { type Bytelike } from './types';

export const CHARSET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const encode = (bytes: Bytelike): string => encodeBytesWithCharset(bytes, CHARSET);

export const decode = (input: string): Uint8Array => decodeBytesWithCharset(input, CHARSET);

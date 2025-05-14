import { type HexString } from './types';

export const hexEncodeNumber = (num: number | bigint): HexString => `0x${num.toString(16)}`;

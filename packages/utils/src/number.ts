import { type HexString } from './types';

export const hexEncodeNumber = (num: number | bigint): HexString => `0x${num.toString(16)}`;

export const bigintMin = (...args: bigint[]): bigint =>
  args.reduce((min, current) => (current < min ? current : min));

export const bigintMax = (...args: bigint[]): bigint =>
  args.reduce((max, current) => (current > max ? current : max));

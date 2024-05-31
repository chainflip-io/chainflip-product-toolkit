import { describe, it, expect } from 'vitest';
import {
  bytesToHex,
  decodeBytesWithCharset,
  encodeBytesWithCharset,
  hexToBytes,
  reverseBytes,
} from '../bytes';
import { HexString } from '../types';

describe(bytesToHex, () => {
  it('converts bytes to hex', () => {
    expect(bytesToHex(new Uint8Array([1, 2, 3, 4, 5]))).toEqual('0x0102030405');
  });

  it('converts bytes to hex (with numbers)', () => {
    expect(bytesToHex([1, 2, 3, 4, 5])).toEqual('0x0102030405');
  });
});

describe(hexToBytes, () => {
  it('converts hex to bytes', () => {
    expect(hexToBytes('0x0102030405')).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it('converts hex to bytes (with numbers)', () => {
    expect(hexToBytes('0xcafebabe')).toEqual(new Uint8Array([202, 254, 186, 190]));
  });

  it('throws if the prefix is missing', () => {
    expect(() => hexToBytes('cafebabe' as HexString)).toThrow('Invalid hex string');
  });

  it('throws if the hex string contains invalid characters', () => {
    expect(() => hexToBytes('0xcafebaby')).toThrow('Invalid hex string');
  });

  it('throws if the hex string is the incorrect length', () => {
    expect(() => hexToBytes('0xcafebab')).toThrow('Invalid hex string');
  });
});

describe(encodeBytesWithCharset, () => {
  it('encodes a number in a charset', () => {
    expect(encodeBytesWithCharset([0xff], '0123456789')).toBe('255');
    expect(encodeBytesWithCharset([0xff, 0xff], '0123456789')).toBe('65535');
    expect(encodeBytesWithCharset([0x8], '01')).toBe('1000');
  });
});

describe(decodeBytesWithCharset, () => {
  it('decodes a number from a charset', () => {
    expect(decodeBytesWithCharset('255', '0123456789')).toEqual(new Uint8Array([0xff]));
    expect(decodeBytesWithCharset('65535', '0123456789')).toEqual(new Uint8Array([0xff, 0xff]));
    expect(decodeBytesWithCharset('1000000', '01')).toEqual(new Uint8Array([64]));
  });

  it('throws if the input contains invalid characters', () => {
    expect(() => decodeBytesWithCharset('1000002', '01')).toThrow('Invalid input');
  });
});

describe(reverseBytes, () => {
  it('reverse a byte string', () => {
    expect(reverseBytes('0x0102030405')).toEqual('0x0504030201');
  });

  it('reverse a byte string without a 0x prefix', () => {
    expect(reverseBytes('0102030405')).toEqual('0504030201');
  });

  it('throws if the input is not a valid hex string', () => {
    expect(() => reverseBytes('0x01020304g5')).toThrow('Invalid hex string');
  });
});

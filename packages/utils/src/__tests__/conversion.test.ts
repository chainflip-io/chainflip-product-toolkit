import { describe, it, expect } from 'vitest';
import { bytesToHex, hexToBytes } from '../conversion';
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

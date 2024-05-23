import { assert } from './assertion';
import { HexString } from './types';

export const bytesToHex = (input: Uint8Array | number[]): `0x${string}` => {
  const bytes = new Uint8Array(input);

  return `0x${Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')}`;
};

export const hexToBytes = (input: HexString): Uint8Array => {
  assert(/^0x[\da-f]*$/i.test(input) && input.length % 2 === 0, 'Invalid hex string');

  const hex = input.slice(2);

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16);
  }

  return bytes;
};

const convertBase = (bytes: Uint8Array | number[], fromBase: number, toBase: number): number[] => {
  const result = [];

  for (const byte of bytes) {
    let carry = byte;

    for (let i = 0; i < result.length; i += 1) {
      carry += result[i] * fromBase;
      result[i] = carry % toBase;
      carry = Math.floor(carry / toBase);
    }

    while (carry !== 0) {
      result.push(carry % toBase);
      carry = Math.floor(carry / toBase);
    }
  }

  let leadingZeros = 0;
  while (bytes[leadingZeros] === 0) {
    leadingZeros += 1;
    result.push(0);
  }

  return result.reverse();
};

export const encodeBytesWithCharset = (bytes: Uint8Array | number[], charset: string): string =>
  convertBase(bytes, 256, charset.length)
    .map((charCode) => charset.charAt(charCode))
    .join('');

export const decodeBytesWithCharset = (input: string, charset: string): number[] => {
  const charMap = Object.fromEntries([...charset].map((char, index) => [char, index]));

  const bytes = input.split('').map((char) => charMap[char]);

  return convertBase(bytes, charset.length, 256);
};

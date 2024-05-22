import { assert } from './assertion';

export const bytesToHex = (input: Uint8Array | number[]): `0x${string}` => {
  const bytes = new Uint8Array(input);

  return `0x${Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')}`;
};

export const hexToBytes = (input: `0x${string}`): Uint8Array => {
  assert(/^0x[\da-f]*$/i.test(input) && input.length % 2 === 0, 'Invalid hex string');

  const hex = input.slice(2);

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16);
  }

  return bytes;
};

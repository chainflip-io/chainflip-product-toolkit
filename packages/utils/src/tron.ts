import { sha256 } from '@noble/hashes/sha2.js';
import { hexToBytes } from '@noble/hashes/utils.js';
import assert from 'assert';
import * as base58 from './base58';

export const isValidTronAddress = (address: string) => {
  try {
    if (!address.startsWith('T')) return false;

    const bytes = base58.decode(address);

    // TRON address should be 25 bytes:
    // 21 bytes payload + 4 bytes checksum
    return bytes.length === 25;
  } catch {
    return false;
  }
};

export const hexToTronAddress = (hex: string) => {
  // remove 0x prefix
  const rawHex = hex.startsWith('0x') ? hex.slice(2) : hex;

  const bytes = hexToBytes(rawHex);
  assert(bytes.length === 20, 'Invalid hex length');

  // Tron mainnet prefix byte is 0x41
  const payload = new Uint8Array(21);
  payload[0] = 0x41;
  payload.set(bytes, 1);

  // double SHA256 checksum, take first 4 bytes
  const checksum = sha256(sha256(payload)).slice(0, 4);

  const addressBytes = new Uint8Array(25);
  addressBytes.set(payload);
  addressBytes.set(checksum, 21);

  return base58.encode(addressBytes);
};

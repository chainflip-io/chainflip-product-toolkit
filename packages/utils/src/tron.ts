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

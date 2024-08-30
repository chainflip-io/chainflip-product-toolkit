import * as base58 from '@chainflip/utils/base58';

export const isValidSolanaAddress = (address: string) => {
  try {
    if (address.length === 0) return false;
    base58.decode(address);
    return true;
  } catch (e) {
    return false;
  }
};

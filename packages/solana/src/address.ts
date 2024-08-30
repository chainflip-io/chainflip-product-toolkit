import * as base58 from '@chainflip/utils/base58';

export const isValidSolanaAddress = (address: string) => {
  try {
    const bytes = base58.decode(address);
    return bytes.length === 32;
  } catch (e) {
    return false;
  }
};

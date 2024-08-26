import { ed25519 } from '@noble/curves/ed25519';
import * as base58 from '@chainflip/utils/base58';

export const isValidSolanaAddress = (address: string) => {
  try {
    const rawBytes = base58.decode(address);
    ed25519.ExtendedPoint.fromHex(rawBytes);
    return true;
  } catch (e) {
    return false;
  }
};

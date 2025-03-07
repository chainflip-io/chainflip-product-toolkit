import { createVaultParamsDecoder, decodeSolanaAdditionalData } from '@chainflip/scale/codecs';
import * as base58 from '@chainflip/utils/base58';
import { Bytes } from 'scale-ts';

export const tryDecodeCfParams = createVaultParamsDecoder(
  Bytes(32),
  (pubkey) => base58.encode(pubkey),
  decodeSolanaAdditionalData,
);

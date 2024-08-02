import { z } from 'zod';
import { cfChainsAddressEncodedAddress, cfChainsCcmDepositMetadata, numberOrHex } from '../common';

export const swappingCcmDepositReceived = z.object({
  ccmId: numberOrHex,
  principalSwapId: numberOrHex.nullish(),
  gasSwapId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata,
});

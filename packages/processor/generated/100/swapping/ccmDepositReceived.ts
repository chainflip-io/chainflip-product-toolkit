import { z } from 'zod';
import { cfChainsAddressEncodedAddress, cfChainsCcmDepositMetadata, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingCcmDepositReceived = z.object({
  ccmId: numberOrHex,
  principalSwapId: numberOrHex.nullish(),
  gasSwapId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata,
});

export const swappingCcmDepositReceivedEvent = defineEvent(
  'Swapping.CcmDepositReceived',
  swappingCcmDepositReceived,
);

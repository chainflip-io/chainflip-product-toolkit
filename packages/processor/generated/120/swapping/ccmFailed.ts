import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmDepositMetadata,
  palletCfSwappingCcmFailReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingCcmFailed = z.object({
  reason: palletCfSwappingCcmFailReason,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata,
});

export const swappingCcmFailedEvent = defineEvent('Swapping.CcmFailed', swappingCcmFailed);

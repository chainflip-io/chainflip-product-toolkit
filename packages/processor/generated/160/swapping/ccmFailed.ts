import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmDepositMetadataGenericEncodedAddress,
  cfChainsSwapOrigin,
  palletCfSwappingCcmFailReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingCcmFailed = z.object({
  reason: palletCfSwappingCcmFailReason,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress,
  origin: cfChainsSwapOrigin,
});

export const swappingCcmFailedEvent = defineEvent('Swapping.CcmFailed', swappingCcmFailed);

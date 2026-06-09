import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmDepositMetadataGenericEncodedAddress,
  cfChainsCcmFailReason,
  cfChainsSwapOrigin,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressCcmFailed = z.object({
  reason: cfChainsCcmFailReason,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress,
  origin: cfChainsSwapOrigin,
});

export const arbitrumIngressEgressCcmFailedEvent = defineEvent(
  'ArbitrumIngressEgress.CcmFailed',
  arbitrumIngressEgressCcmFailed,
);

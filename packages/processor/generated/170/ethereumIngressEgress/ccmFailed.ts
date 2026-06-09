import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmDepositMetadataGenericEncodedAddress,
  cfChainsCcmFailReason,
  cfChainsSwapOrigin,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressCcmFailed = z.object({
  reason: cfChainsCcmFailReason,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress,
  origin: cfChainsSwapOrigin,
});

export const ethereumIngressEgressCcmFailedEvent = defineEvent(
  'EthereumIngressEgress.CcmFailed',
  ethereumIngressEgressCcmFailed,
);

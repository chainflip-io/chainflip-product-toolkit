import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmDepositMetadata,
  cfChainsSwapOrigin,
  palletCfSwappingCcmFailReason,
} from '../common';

export const swappingCcmFailed = z.object({
  reason: palletCfSwappingCcmFailReason,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata,
  origin: cfChainsSwapOrigin,
});

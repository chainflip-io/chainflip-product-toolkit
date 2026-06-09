import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingWithdrawalRequested = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
});

export const swappingWithdrawalRequestedEvent = defineEvent(
  'Swapping.WithdrawalRequested',
  swappingWithdrawalRequested,
);

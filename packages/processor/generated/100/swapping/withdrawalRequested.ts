import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';

export const swappingWithdrawalRequested = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
});

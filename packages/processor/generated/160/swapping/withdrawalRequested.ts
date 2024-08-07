import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfPrimitivesChainsAssetsAnyAsset,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';

export const swappingWithdrawalRequested = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAsset: cfPrimitivesChainsAssetsAnyAsset,
  egressAmount: numberOrHex,
  egressFee: numberOrHex,
  destinationAddress: cfChainsAddressEncodedAddress,
});

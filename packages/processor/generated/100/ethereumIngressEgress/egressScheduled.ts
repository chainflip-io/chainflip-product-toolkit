import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  cfPrimitivesChainsForeignChain,
  hexString,
  numberOrHex,
} from '../common';

export const ethereumIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

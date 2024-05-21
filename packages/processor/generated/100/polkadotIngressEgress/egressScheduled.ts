import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  cfPrimitivesChainsForeignChain,
  hexString,
  numberOrHex,
} from '../common';

export const polkadotIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const liquidityProviderAccountDebited = z.object({
  accountId,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amountDebited: numberOrHex,
});

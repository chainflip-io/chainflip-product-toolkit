import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';

export const lendingPoolsCollateralAdded = z.object({
  borrowerId: accountId,
  collateral: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  primaryCollateralAsset: cfPrimitivesChainsAssetsAnyAsset,
});

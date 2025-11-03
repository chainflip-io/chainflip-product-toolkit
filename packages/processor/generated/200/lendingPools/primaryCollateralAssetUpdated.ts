import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset } from '../common';

export const lendingPoolsPrimaryCollateralAssetUpdated = z.object({
  borrowerId: accountId,
  primaryCollateralAsset: cfPrimitivesChainsAssetsAnyAsset,
});

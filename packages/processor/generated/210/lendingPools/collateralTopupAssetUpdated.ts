import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsCollateralTopupAssetUpdated = z.object({
  borrowerId: accountId,
  collateralTopupAsset: cfPrimitivesChainsAssetsAnyAsset.nullish(),
});

export const lendingPoolsCollateralTopupAssetUpdatedEvent = defineEvent(
  'LendingPools.CollateralTopupAssetUpdated',
  lendingPoolsCollateralTopupAssetUpdated,
);

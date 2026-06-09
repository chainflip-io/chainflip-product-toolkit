import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsCollateralRemoved = z.object({
  borrowerId: accountId,
  collateral: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  primaryCollateralAsset: cfPrimitivesChainsAssetsAnyAsset,
});

export const lendingPoolsCollateralRemovedEvent = defineEvent(
  'LendingPools.CollateralRemoved',
  lendingPoolsCollateralRemoved,
);

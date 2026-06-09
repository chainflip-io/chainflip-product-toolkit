import { z } from 'zod';
import {
  accountId,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfLendingPoolsCollateralAddedActionType,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsCollateralAdded = z.object({
  borrowerId: accountId,
  collateral: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  actionType: palletCfLendingPoolsCollateralAddedActionType,
});

export const lendingPoolsCollateralAddedEvent = defineEvent(
  'LendingPools.CollateralAdded',
  lendingPoolsCollateralAdded,
);

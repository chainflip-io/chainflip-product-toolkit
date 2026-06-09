import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLendingFeeCollectionInitiated = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  swapRequestId: numberOrHex,
});

export const lendingPoolsLendingFeeCollectionInitiatedEvent = defineEvent(
  'LendingPools.LendingFeeCollectionInitiated',
  lendingPoolsLendingFeeCollectionInitiated,
);

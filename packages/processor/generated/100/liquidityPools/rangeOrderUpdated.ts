import { z } from 'zod';
import {
  accountId,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsAssetsMap,
  palletCfPoolsIncreaseOrDecreaseRangeOrderChange,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsRangeOrderUpdated = z.object({
  lp: accountId,
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  pairAsset: cfPrimitivesChainsAssetsAnyAsset,
  id: numberOrHex,
  tickRange: z.object({ start: z.number(), end: z.number() }),
  sizeChange: palletCfPoolsIncreaseOrDecreaseRangeOrderChange.nullish(),
  liquidityTotal: numberOrHex,
  collectedFees: palletCfPoolsAssetsMap,
});

export const liquidityPoolsRangeOrderUpdatedEvent = defineEvent(
  'LiquidityPools.RangeOrderUpdated',
  liquidityPoolsRangeOrderUpdated,
);

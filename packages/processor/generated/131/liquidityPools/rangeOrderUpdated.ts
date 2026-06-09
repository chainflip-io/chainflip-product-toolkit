import { z } from 'zod';
import {
  accountId,
  cfAmmCommonPoolPairsMap,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsIncreaseOrDecreaseRangeOrderChange,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsRangeOrderUpdated = z.object({
  lp: accountId,
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
  id: numberOrHex,
  tickRange: z.object({ start: z.number(), end: z.number() }),
  sizeChange: palletCfPoolsIncreaseOrDecreaseRangeOrderChange.nullish(),
  liquidityTotal: numberOrHex,
  collectedFees: cfAmmCommonPoolPairsMap,
});

export const liquidityPoolsRangeOrderUpdatedEvent = defineEvent(
  'LiquidityPools.RangeOrderUpdated',
  liquidityPoolsRangeOrderUpdated,
);

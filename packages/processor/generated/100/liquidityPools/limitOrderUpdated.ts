import { z } from 'zod';
import {
  accountId,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsIncreaseOrDecreaseU128,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsLimitOrderUpdated = z.object({
  lp: accountId,
  sellAsset: cfPrimitivesChainsAssetsAnyAsset,
  buyAsset: cfPrimitivesChainsAssetsAnyAsset,
  id: numberOrHex,
  tick: z.number(),
  amountChange: palletCfPoolsIncreaseOrDecreaseU128.nullish(),
  amountTotal: numberOrHex,
  collectedFees: numberOrHex,
  boughtAmount: numberOrHex,
});

export const liquidityPoolsLimitOrderUpdatedEvent = defineEvent(
  'LiquidityPools.LimitOrderUpdated',
  liquidityPoolsLimitOrderUpdated,
);

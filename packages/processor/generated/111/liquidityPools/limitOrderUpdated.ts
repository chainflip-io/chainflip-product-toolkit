import { z } from 'zod';
import {
  accountId,
  cfAmmCommonOrder,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsIncreaseOrDecreaseU128,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsLimitOrderUpdated = z.object({
  lp: accountId,
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
  side: cfAmmCommonOrder,
  id: numberOrHex,
  tick: z.number(),
  sellAmountChange: palletCfPoolsIncreaseOrDecreaseU128.nullish(),
  sellAmountTotal: numberOrHex,
  collectedFees: numberOrHex,
  boughtAmount: numberOrHex,
});

export const liquidityPoolsLimitOrderUpdatedEvent = defineEvent(
  'LiquidityPools.LimitOrderUpdated',
  liquidityPoolsLimitOrderUpdated,
);

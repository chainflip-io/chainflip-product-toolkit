import { z } from 'zod';
import {
  accountId,
  cfAmmCommonPoolPairsMap,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsIncreaseOrDecreaseRangeOrderChange,
} from '../common';

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

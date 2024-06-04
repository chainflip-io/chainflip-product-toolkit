import { z } from 'zod';
import {
  accountId,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsAssetsMap,
  palletCfPoolsIncreaseOrDecreaseRangeOrderChange,
} from '../common';

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

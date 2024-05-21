import { z } from 'zod';
import {
  accountId,
  cfAmmCommonSide,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
  palletCfPoolsPalletIncreaseOrDecrease,
} from '../common';

export const liquidityPoolsLimitOrderUpdated = z.object({
  lp: accountId,
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
  side: cfAmmCommonSide,
  id: numberOrHex,
  tick: z.number(),
  sellAmountChange: palletCfPoolsPalletIncreaseOrDecrease.nullish(),
  sellAmountTotal: numberOrHex,
  collectedFees: numberOrHex,
  boughtAmount: numberOrHex,
});

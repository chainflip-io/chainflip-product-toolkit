import { z } from 'zod';
import { palletCfPoolsAssetPair } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsPriceImpactLimitSet = z.object({
  assetPair: palletCfPoolsAssetPair,
  limit: z.number().nullish(),
});

export const liquidityPoolsPriceImpactLimitSetEvent = defineEvent(
  'LiquidityPools.PriceImpactLimitSet',
  liquidityPoolsPriceImpactLimitSet,
);

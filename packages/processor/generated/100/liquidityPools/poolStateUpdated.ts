import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsPoolStateUpdated = z.object({
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  pairAsset: cfPrimitivesChainsAssetsAnyAsset,
  enabled: z.boolean(),
});

export const liquidityPoolsPoolStateUpdatedEvent = defineEvent(
  'LiquidityPools.PoolStateUpdated',
  liquidityPoolsPoolStateUpdated,
);

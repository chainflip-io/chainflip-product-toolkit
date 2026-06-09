import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsUpdatedBuyInterval = z.object({ buyInterval: z.number() });

export const liquidityPoolsUpdatedBuyIntervalEvent = defineEvent(
  'LiquidityPools.UpdatedBuyInterval',
  liquidityPoolsUpdatedBuyInterval,
);

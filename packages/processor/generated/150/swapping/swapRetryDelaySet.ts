import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapRetryDelaySet = z.object({ swapRetryDelay: z.number() });

export const swappingSwapRetryDelaySetEvent = defineEvent(
  'Swapping.SwapRetryDelaySet',
  swappingSwapRetryDelaySet,
);

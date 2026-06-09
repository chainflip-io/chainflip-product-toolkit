import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMaxSwapRetryDurationSet = z.object({ blocks: z.number() });

export const swappingMaxSwapRetryDurationSetEvent = defineEvent(
  'Swapping.MaxSwapRetryDurationSet',
  swappingMaxSwapRetryDurationSet,
);

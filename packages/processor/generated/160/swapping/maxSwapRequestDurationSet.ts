import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMaxSwapRequestDurationSet = z.object({ blocks: z.number() });

export const swappingMaxSwapRequestDurationSetEvent = defineEvent(
  'Swapping.MaxSwapRequestDurationSet',
  swappingMaxSwapRequestDurationSet,
);

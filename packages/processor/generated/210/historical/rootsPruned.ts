import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const historicalRootsPruned = z.object({ upTo: z.number() });

export const historicalRootsPrunedEvent = defineEvent(
  'Historical.RootsPruned',
  historicalRootsPruned,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const historicalRootStored = z.object({ index: z.number() });

export const historicalRootStoredEvent = defineEvent('Historical.RootStored', historicalRootStored);

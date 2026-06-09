import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapRescheduled = z.object({ swapId: numberOrHex, executeAt: z.number() });

export const swappingSwapRescheduledEvent = defineEvent(
  'Swapping.SwapRescheduled',
  swappingSwapRescheduled,
);

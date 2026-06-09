import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapRequestCompleted = z.object({ swapRequestId: numberOrHex });

export const swappingSwapRequestCompletedEvent = defineEvent(
  'Swapping.SwapRequestCompleted',
  swappingSwapRequestCompleted,
);

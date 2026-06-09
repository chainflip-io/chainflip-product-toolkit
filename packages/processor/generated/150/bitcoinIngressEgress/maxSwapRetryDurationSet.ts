import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressMaxSwapRetryDurationSet = z.object({
  maxSwapRetryDurationBlocks: z.number(),
});

export const bitcoinIngressEgressMaxSwapRetryDurationSetEvent = defineEvent(
  'BitcoinIngressEgress.MaxSwapRetryDurationSet',
  bitcoinIngressEgressMaxSwapRetryDurationSet,
);

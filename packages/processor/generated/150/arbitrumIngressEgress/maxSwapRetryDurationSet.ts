import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressMaxSwapRetryDurationSet = z.object({
  maxSwapRetryDurationBlocks: z.number(),
});

export const arbitrumIngressEgressMaxSwapRetryDurationSetEvent = defineEvent(
  'ArbitrumIngressEgress.MaxSwapRetryDurationSet',
  arbitrumIngressEgressMaxSwapRetryDurationSet,
);

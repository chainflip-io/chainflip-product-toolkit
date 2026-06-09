import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressMaxSwapRetryDurationSet = z.object({
  maxSwapRetryDurationBlocks: z.number(),
});

export const ethereumIngressEgressMaxSwapRetryDurationSetEvent = defineEvent(
  'EthereumIngressEgress.MaxSwapRetryDurationSet',
  ethereumIngressEgressMaxSwapRetryDurationSet,
);

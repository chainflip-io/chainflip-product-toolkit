import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressMaxSwapRetryDurationSet = z.object({
  maxSwapRetryDurationBlocks: z.number(),
});

export const solanaIngressEgressMaxSwapRetryDurationSetEvent = defineEvent(
  'SolanaIngressEgress.MaxSwapRetryDurationSet',
  solanaIngressEgressMaxSwapRetryDurationSet,
);

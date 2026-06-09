import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressMaxSwapRetryDurationSet = z.object({
  maxSwapRetryDurationBlocks: z.number(),
});

export const polkadotIngressEgressMaxSwapRetryDurationSetEvent = defineEvent(
  'PolkadotIngressEgress.MaxSwapRetryDurationSet',
  polkadotIngressEgressMaxSwapRetryDurationSet,
);

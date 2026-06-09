import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsArbitrum } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsArbitrum,
});

export const arbitrumIngressEgressCcmFallbackScheduledEvent = defineEvent(
  'ArbitrumIngressEgress.CcmFallbackScheduled',
  arbitrumIngressEgressCcmFallbackScheduled,
);

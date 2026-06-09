import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsSolana } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsSolana,
});

export const solanaIngressEgressCcmFallbackScheduledEvent = defineEvent(
  'SolanaIngressEgress.CcmFallbackScheduled',
  solanaIngressEgressCcmFallbackScheduled,
);

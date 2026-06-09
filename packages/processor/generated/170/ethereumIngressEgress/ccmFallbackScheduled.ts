import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsEthereum } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsEthereum,
});

export const ethereumIngressEgressCcmFallbackScheduledEvent = defineEvent(
  'EthereumIngressEgress.CcmFallbackScheduled',
  ethereumIngressEgressCcmFallbackScheduled,
);

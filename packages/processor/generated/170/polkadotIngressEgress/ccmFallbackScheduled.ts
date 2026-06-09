import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsPolkadot } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsPolkadot,
});

export const polkadotIngressEgressCcmFallbackScheduledEvent = defineEvent(
  'PolkadotIngressEgress.CcmFallbackScheduled',
  polkadotIngressEgressCcmFallbackScheduled,
);

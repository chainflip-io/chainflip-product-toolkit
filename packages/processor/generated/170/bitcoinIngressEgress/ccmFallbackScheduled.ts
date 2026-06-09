import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsBitcoin } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsBitcoin,
});

export const bitcoinIngressEgressCcmFallbackScheduledEvent = defineEvent(
  'BitcoinIngressEgress.CcmFallbackScheduled',
  bitcoinIngressEgressCcmFallbackScheduled,
);

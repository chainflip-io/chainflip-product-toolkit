import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsBitcoin } from '../common';

export const bitcoinIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsBitcoin,
});

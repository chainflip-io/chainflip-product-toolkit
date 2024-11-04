import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsPolkadot } from '../common';

export const polkadotIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsPolkadot,
});

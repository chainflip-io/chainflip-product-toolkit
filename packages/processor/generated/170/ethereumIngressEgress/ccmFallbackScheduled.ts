import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsEthereum } from '../common';

export const ethereumIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsEthereum,
});

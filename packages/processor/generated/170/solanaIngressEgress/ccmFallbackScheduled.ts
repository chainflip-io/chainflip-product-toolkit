import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsSolana } from '../common';

export const solanaIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsSolana,
});

import { z } from 'zod';
import { cfTraitsScheduledEgressDetailsArbitrum } from '../common';

export const arbitrumIngressEgressCcmFallbackScheduled = z.object({
  broadcastId: z.number(),
  egressDetails: cfTraitsScheduledEgressDetailsArbitrum,
});

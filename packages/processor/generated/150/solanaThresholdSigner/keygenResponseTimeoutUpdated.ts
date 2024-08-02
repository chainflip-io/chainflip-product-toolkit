import { z } from 'zod';

export const solanaThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

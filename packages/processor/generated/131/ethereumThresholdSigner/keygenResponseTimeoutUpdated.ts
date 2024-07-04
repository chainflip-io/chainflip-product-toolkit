import { z } from 'zod';

export const ethereumThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

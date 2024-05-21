import { z } from 'zod';

export const bitcoinThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

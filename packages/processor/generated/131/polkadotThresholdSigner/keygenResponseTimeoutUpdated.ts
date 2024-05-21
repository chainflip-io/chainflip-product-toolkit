import { z } from 'zod';

export const polkadotThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

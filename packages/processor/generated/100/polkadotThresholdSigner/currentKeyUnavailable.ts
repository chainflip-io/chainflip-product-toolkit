import { z } from 'zod';

export const polkadotThresholdSignerCurrentKeyUnavailable = z.object({
  requestId: z.number(),
  attemptCount: z.number(),
});

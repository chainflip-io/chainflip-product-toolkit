import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumThresholdSignerRetryRequested = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
});

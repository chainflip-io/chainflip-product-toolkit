import { z } from 'zod';

export const swappingMaxSwapRetryDurationSet = z.object({ blocks: z.number() });

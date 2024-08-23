import { z } from 'zod';

export const swappingMaxSwapRequestDurationSet = z.object({ blocks: z.number() });

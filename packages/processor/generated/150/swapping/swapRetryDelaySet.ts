import { z } from 'zod';

export const swappingSwapRetryDelaySet = z.object({ swapRetryDelay: z.number() });

import { z } from 'zod';

export const swappingBuyIntervalSet = z.object({ buyInterval: z.number() });

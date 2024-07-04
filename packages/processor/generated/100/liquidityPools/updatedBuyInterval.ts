import { z } from 'zod';

export const liquidityPoolsUpdatedBuyInterval = z.object({ buyInterval: z.number() });

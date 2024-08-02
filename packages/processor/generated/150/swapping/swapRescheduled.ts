import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingSwapRescheduled = z.object({ swapId: numberOrHex, executeAt: z.number() });

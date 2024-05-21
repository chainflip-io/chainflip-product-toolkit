import { z } from 'zod';

export const flipSlashingRateUpdated = z.object({ slashingRate: z.number() });

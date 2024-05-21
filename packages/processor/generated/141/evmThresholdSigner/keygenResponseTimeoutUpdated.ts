import { z } from 'zod';

export const evmThresholdSignerKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

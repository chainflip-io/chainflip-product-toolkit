import { z } from 'zod';

export const ethereumIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

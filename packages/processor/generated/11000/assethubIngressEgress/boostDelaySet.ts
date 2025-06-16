import { z } from 'zod';

export const assethubIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

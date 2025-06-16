import { z } from 'zod';

export const solanaIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

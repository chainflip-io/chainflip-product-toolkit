import { z } from 'zod';

export const arbitrumIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

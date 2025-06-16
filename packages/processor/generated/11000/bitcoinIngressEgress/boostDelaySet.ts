import { z } from 'zod';

export const bitcoinIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

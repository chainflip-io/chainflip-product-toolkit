import { z } from 'zod';

export const polkadotIngressEgressBoostDelaySet = z.object({ delayBlocks: z.number() });

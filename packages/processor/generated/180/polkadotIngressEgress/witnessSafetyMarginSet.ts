import { z } from 'zod';

export const polkadotIngressEgressWitnessSafetyMarginSet = z.object({ margin: z.number() });

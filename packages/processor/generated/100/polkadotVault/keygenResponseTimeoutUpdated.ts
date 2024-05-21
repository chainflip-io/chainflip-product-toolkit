import { z } from 'zod';

export const polkadotVaultKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

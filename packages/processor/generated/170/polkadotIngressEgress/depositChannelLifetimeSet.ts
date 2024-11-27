import { z } from 'zod';

export const polkadotIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: z.number() });

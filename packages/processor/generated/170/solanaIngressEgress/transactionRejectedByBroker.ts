import { z } from 'zod';

export const solanaIngressEgressTransactionRejectedByBroker = z.object({ broadcastId: z.number() });

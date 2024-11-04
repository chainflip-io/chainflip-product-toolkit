import { z } from 'zod';

export const solanaIngressEgressTaintedTransactionRejected = z.object({ broadcastId: z.number() });

import { z } from 'zod';

export const polkadotIngressEgressTaintedTransactionRejected = z.object({
  broadcastId: z.number(),
  txId: z.number(),
});

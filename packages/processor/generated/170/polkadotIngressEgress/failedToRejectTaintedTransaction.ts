import { z } from 'zod';

export const polkadotIngressEgressFailedToRejectTaintedTransaction = z.object({ txId: z.number() });

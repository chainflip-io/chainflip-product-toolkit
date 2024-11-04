import { z } from 'zod';
import { cfChainsEvmDepositDetails } from '../common';

export const ethereumIngressEgressTaintedTransactionRejected = z.object({
  broadcastId: z.number(),
  txId: cfChainsEvmDepositDetails,
});

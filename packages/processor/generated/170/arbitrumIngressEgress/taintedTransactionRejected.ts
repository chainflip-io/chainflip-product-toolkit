import { z } from 'zod';
import { cfChainsEvmDepositDetails } from '../common';

export const arbitrumIngressEgressTaintedTransactionRejected = z.object({
  broadcastId: z.number(),
  txId: cfChainsEvmDepositDetails,
});

import { z } from 'zod';
import { accountId, cfPrimitivesTxId } from '../common';

export const polkadotIngressEgressTaintedTransactionReportReceived = z.object({
  accountId,
  txId: cfPrimitivesTxId,
  expiresAt: z.number(),
});

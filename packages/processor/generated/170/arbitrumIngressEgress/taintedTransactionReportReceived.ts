import { z } from 'zod';
import { accountId, hexString } from '../common';

export const arbitrumIngressEgressTaintedTransactionReportReceived = z.object({
  accountId,
  txId: hexString,
  expiresAt: z.number(),
});

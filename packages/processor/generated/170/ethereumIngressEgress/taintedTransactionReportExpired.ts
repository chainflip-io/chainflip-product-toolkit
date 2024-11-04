import { z } from 'zod';
import { accountId, hexString } from '../common';

export const ethereumIngressEgressTaintedTransactionReportExpired = z.object({
  accountId,
  txId: hexString,
});

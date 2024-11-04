import { z } from 'zod';
import { accountId, hexString } from '../common';

export const solanaIngressEgressTaintedTransactionReportExpired = z.object({
  accountId,
  txId: hexString,
});

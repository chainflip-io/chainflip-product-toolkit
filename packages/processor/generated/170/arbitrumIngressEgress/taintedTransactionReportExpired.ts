import { z } from 'zod';
import { accountId, hexString } from '../common';

export const arbitrumIngressEgressTaintedTransactionReportExpired = z.object({
  accountId,
  txId: hexString,
});

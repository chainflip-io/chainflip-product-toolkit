import { z } from 'zod';
import { accountId, hexString } from '../common';

export const bitcoinIngressEgressTaintedTransactionReportExpired = z.object({
  accountId,
  txId: hexString,
});

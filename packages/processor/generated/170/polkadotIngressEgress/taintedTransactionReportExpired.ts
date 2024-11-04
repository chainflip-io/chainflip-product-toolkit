import { z } from 'zod';
import { accountId, cfPrimitivesTxId } from '../common';

export const polkadotIngressEgressTaintedTransactionReportExpired = z.object({
  accountId,
  txId: cfPrimitivesTxId,
});

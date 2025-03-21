import { z } from 'zod';
import { accountId, hexString } from '../common';

export const solanaIngressEgressTransactionRejectionRequestExpired = z.object({
  accountId,
  txId: hexString,
});

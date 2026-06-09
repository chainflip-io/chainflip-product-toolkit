import { z } from 'zod';
import { accountId, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressTransactionRejectionRequestExpired = z.object({
  accountId,
  txId: hexString,
});

export const solanaIngressEgressTransactionRejectionRequestExpiredEvent = defineEvent(
  'SolanaIngressEgress.TransactionRejectionRequestExpired',
  solanaIngressEgressTransactionRejectionRequestExpired,
);

import { z } from 'zod';
import { accountId, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressTransactionRejectionRequestReceived = z.object({
  accountId,
  txId: hexString,
  expiresAt: z.number(),
});

export const solanaIngressEgressTransactionRejectionRequestReceivedEvent = defineEvent(
  'SolanaIngressEgress.TransactionRejectionRequestReceived',
  solanaIngressEgressTransactionRejectionRequestReceived,
);

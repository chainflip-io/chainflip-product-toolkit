import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressTransactionRejectionFailed = z.object({});

export const solanaIngressEgressTransactionRejectionFailedEvent = defineEvent(
  'SolanaIngressEgress.TransactionRejectionFailed',
  solanaIngressEgressTransactionRejectionFailed,
);

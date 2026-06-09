import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressTransactionRejectedByBroker = z.object({ broadcastId: z.number() });

export const solanaIngressEgressTransactionRejectedByBrokerEvent = defineEvent(
  'SolanaIngressEgress.TransactionRejectedByBroker',
  solanaIngressEgressTransactionRejectedByBroker,
);

import { z } from 'zod';
import { accountId, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaBroadcasterTransactionBroadcastRequest = z.object({
  broadcastId: z.number(),
  nominee: accountId,
  transactionOutId: hexString,
});

export const solanaBroadcasterTransactionBroadcastRequestEvent = defineEvent(
  'SolanaBroadcaster.TransactionBroadcastRequest',
  solanaBroadcasterTransactionBroadcastRequest,
);

import { z } from 'zod';
import { accountId, cfChainsSolSolTxCoreTransaction, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaBroadcasterTransactionBroadcastRequest = z.object({
  broadcastId: z.number(),
  nominee: accountId,
  transactionPayload: cfChainsSolSolTxCoreTransaction,
  transactionOutId: hexString,
});

export const solanaBroadcasterTransactionBroadcastRequestEvent = defineEvent(
  'SolanaBroadcaster.TransactionBroadcastRequest',
  solanaBroadcasterTransactionBroadcastRequest,
);

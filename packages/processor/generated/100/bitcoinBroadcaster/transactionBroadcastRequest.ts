import { z } from 'zod';
import {
  accountId,
  cfChainsBtcBitcoinTransactionData,
  hexString,
  palletCfBroadcastBroadcastAttemptId,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterTransactionBroadcastRequest = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
  nominee: accountId,
  transactionPayload: cfChainsBtcBitcoinTransactionData,
  transactionOutId: hexString,
});

export const bitcoinBroadcasterTransactionBroadcastRequestEvent = defineEvent(
  'BitcoinBroadcaster.TransactionBroadcastRequest',
  bitcoinBroadcasterTransactionBroadcastRequest,
);

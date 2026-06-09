import { z } from 'zod';
import {
  accountId,
  cfChainsDotPolkadotTransactionData,
  hexString,
  palletCfBroadcastBroadcastAttemptId,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterTransactionBroadcastRequest = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
  nominee: accountId,
  transactionPayload: cfChainsDotPolkadotTransactionData,
  transactionOutId: hexString,
});

export const polkadotBroadcasterTransactionBroadcastRequestEvent = defineEvent(
  'PolkadotBroadcaster.TransactionBroadcastRequest',
  polkadotBroadcasterTransactionBroadcastRequest,
);

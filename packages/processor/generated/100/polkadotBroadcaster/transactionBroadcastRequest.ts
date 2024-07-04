import { z } from 'zod';
import {
  accountId,
  cfChainsDotPolkadotTransactionData,
  hexString,
  palletCfBroadcastBroadcastAttemptId,
} from '../common';

export const polkadotBroadcasterTransactionBroadcastRequest = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
  nominee: accountId,
  transactionPayload: cfChainsDotPolkadotTransactionData,
  transactionOutId: hexString,
});

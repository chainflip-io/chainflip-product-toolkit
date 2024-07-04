import { z } from 'zod';
import {
  accountId,
  cfChainsBtcBitcoinTransactionData,
  hexString,
  palletCfBroadcastBroadcastAttemptId,
} from '../common';

export const bitcoinBroadcasterTransactionBroadcastRequest = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
  nominee: accountId,
  transactionPayload: cfChainsBtcBitcoinTransactionData,
  transactionOutId: hexString,
});

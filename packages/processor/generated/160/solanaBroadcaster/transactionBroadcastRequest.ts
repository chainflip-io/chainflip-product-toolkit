import { z } from 'zod';
import { accountId, cfChainsSolSolTxCoreTransaction, hexString } from '../common';

export const solanaBroadcasterTransactionBroadcastRequest = z.object({
  broadcastId: z.number(),
  nominee: accountId,
  transactionPayload: cfChainsSolSolTxCoreTransaction,
  transactionOutId: hexString,
});

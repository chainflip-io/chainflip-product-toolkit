import { z } from 'zod';
import { accountId, hexString } from '../common';

export const solanaBroadcasterTransactionBroadcastRequest = z.object({
  broadcastId: z.number(),
  nominee: accountId,
  transactionOutId: hexString,
});

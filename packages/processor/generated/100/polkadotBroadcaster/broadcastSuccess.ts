import { z } from 'zod';
import { hexString } from '../common';

export const polkadotBroadcasterBroadcastSuccess = z.object({
  broadcastId: z.number(),
  transactionOutId: hexString,
});

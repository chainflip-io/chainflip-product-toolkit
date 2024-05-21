import { z } from 'zod';
import { cfChainsEvmSchnorrVerificationComponents } from '../common';

export const ethereumBroadcasterBroadcastSuccess = z.object({
  broadcastId: z.number(),
  transactionOutId: cfChainsEvmSchnorrVerificationComponents,
});

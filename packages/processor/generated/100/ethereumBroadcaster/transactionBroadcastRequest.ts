import { z } from 'zod';
import {
  accountId,
  cfChainsEvmSchnorrVerificationComponents,
  cfChainsEvmTransaction,
  palletCfBroadcastBroadcastAttemptId,
} from '../common';

export const ethereumBroadcasterTransactionBroadcastRequest = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
  nominee: accountId,
  transactionPayload: cfChainsEvmTransaction,
  transactionOutId: cfChainsEvmSchnorrVerificationComponents,
});

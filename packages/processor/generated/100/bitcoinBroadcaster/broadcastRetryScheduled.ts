import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';

export const bitcoinBroadcasterBroadcastRetryScheduled = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

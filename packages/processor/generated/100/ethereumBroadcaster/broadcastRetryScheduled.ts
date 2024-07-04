import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';

export const ethereumBroadcasterBroadcastRetryScheduled = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

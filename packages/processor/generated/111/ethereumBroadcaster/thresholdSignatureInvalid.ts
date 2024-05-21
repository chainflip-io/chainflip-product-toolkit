import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';

export const ethereumBroadcasterThresholdSignatureInvalid = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

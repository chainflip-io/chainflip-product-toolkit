import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';

export const polkadotBroadcasterBroadcastAttemptTimeout = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterBroadcastRetryScheduled = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const ethereumBroadcasterBroadcastRetryScheduledEvent = defineEvent(
  'EthereumBroadcaster.BroadcastRetryScheduled',
  ethereumBroadcasterBroadcastRetryScheduled,
);

import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterBroadcastRetryScheduled = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const polkadotBroadcasterBroadcastRetryScheduledEvent = defineEvent(
  'PolkadotBroadcaster.BroadcastRetryScheduled',
  polkadotBroadcasterBroadcastRetryScheduled,
);

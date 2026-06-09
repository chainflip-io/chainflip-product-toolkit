import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterBroadcastRetryScheduled = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const bitcoinBroadcasterBroadcastRetryScheduledEvent = defineEvent(
  'BitcoinBroadcaster.BroadcastRetryScheduled',
  bitcoinBroadcasterBroadcastRetryScheduled,
);

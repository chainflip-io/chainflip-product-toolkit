import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterBroadcastAttemptTimeout = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const ethereumBroadcasterBroadcastAttemptTimeoutEvent = defineEvent(
  'EthereumBroadcaster.BroadcastAttemptTimeout',
  ethereumBroadcasterBroadcastAttemptTimeout,
);

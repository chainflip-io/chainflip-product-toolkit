import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterBroadcastAttemptTimeout = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const polkadotBroadcasterBroadcastAttemptTimeoutEvent = defineEvent(
  'PolkadotBroadcaster.BroadcastAttemptTimeout',
  polkadotBroadcasterBroadcastAttemptTimeout,
);

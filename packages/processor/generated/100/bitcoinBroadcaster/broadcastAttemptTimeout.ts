import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterBroadcastAttemptTimeout = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const bitcoinBroadcasterBroadcastAttemptTimeoutEvent = defineEvent(
  'BitcoinBroadcaster.BroadcastAttemptTimeout',
  bitcoinBroadcasterBroadcastAttemptTimeout,
);

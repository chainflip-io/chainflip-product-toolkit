import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const bitcoinBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'BitcoinBroadcaster.BroadcastCallbackExecuted',
  bitcoinBroadcasterBroadcastCallbackExecuted,
);

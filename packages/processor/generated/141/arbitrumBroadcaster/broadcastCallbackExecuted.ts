import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const arbitrumBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'ArbitrumBroadcaster.BroadcastCallbackExecuted',
  arbitrumBroadcasterBroadcastCallbackExecuted,
);

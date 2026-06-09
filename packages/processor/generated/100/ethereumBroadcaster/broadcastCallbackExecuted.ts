import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const ethereumBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'EthereumBroadcaster.BroadcastCallbackExecuted',
  ethereumBroadcasterBroadcastCallbackExecuted,
);

import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const assethubBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'AssethubBroadcaster.BroadcastCallbackExecuted',
  assethubBroadcasterBroadcastCallbackExecuted,
);

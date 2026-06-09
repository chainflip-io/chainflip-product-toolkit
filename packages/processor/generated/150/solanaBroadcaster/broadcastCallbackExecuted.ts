import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const solanaBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'SolanaBroadcaster.BroadcastCallbackExecuted',
  solanaBroadcasterBroadcastCallbackExecuted,
);

import { z } from 'zod';
import { dispatchResult } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterBroadcastCallbackExecuted = z.object({
  broadcastId: z.number(),
  result: dispatchResult,
});

export const polkadotBroadcasterBroadcastCallbackExecutedEvent = defineEvent(
  'PolkadotBroadcaster.BroadcastCallbackExecuted',
  polkadotBroadcasterBroadcastCallbackExecuted,
);

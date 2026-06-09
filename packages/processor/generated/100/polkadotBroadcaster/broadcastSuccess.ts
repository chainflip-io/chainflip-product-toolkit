import { z } from 'zod';
import { hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterBroadcastSuccess = z.object({
  broadcastId: z.number(),
  transactionOutId: hexString,
});

export const polkadotBroadcasterBroadcastSuccessEvent = defineEvent(
  'PolkadotBroadcaster.BroadcastSuccess',
  polkadotBroadcasterBroadcastSuccess,
);

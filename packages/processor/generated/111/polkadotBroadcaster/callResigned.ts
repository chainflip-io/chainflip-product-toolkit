import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const polkadotBroadcasterCallResignedEvent = defineEvent(
  'PolkadotBroadcaster.CallResigned',
  polkadotBroadcasterCallResigned,
);

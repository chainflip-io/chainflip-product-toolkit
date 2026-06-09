import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const arbitrumBroadcasterCallResignedEvent = defineEvent(
  'ArbitrumBroadcaster.CallResigned',
  arbitrumBroadcasterCallResigned,
);

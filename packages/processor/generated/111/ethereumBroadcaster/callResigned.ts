import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const ethereumBroadcasterCallResignedEvent = defineEvent(
  'EthereumBroadcaster.CallResigned',
  ethereumBroadcasterCallResigned,
);

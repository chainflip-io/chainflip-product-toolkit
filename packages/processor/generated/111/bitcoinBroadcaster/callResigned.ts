import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const bitcoinBroadcasterCallResignedEvent = defineEvent(
  'BitcoinBroadcaster.CallResigned',
  bitcoinBroadcasterCallResigned,
);

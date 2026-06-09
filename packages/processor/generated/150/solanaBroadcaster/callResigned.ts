import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const solanaBroadcasterCallResignedEvent = defineEvent(
  'SolanaBroadcaster.CallResigned',
  solanaBroadcasterCallResigned,
);

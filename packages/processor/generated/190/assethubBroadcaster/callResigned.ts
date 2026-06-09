import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const assethubBroadcasterCallResigned = z.object({ broadcastId: z.number() });

export const assethubBroadcasterCallResignedEvent = defineEvent(
  'AssethubBroadcaster.CallResigned',
  assethubBroadcasterCallResigned,
);

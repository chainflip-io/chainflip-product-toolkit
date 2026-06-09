import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotThresholdSignerCurrentKeyUnavailable = z.object({
  requestId: z.number(),
  attemptCount: z.number(),
});

export const polkadotThresholdSignerCurrentKeyUnavailableEvent = defineEvent(
  'PolkadotThresholdSigner.CurrentKeyUnavailable',
  polkadotThresholdSignerCurrentKeyUnavailable,
);

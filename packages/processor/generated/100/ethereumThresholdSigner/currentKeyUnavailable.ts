import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerCurrentKeyUnavailable = z.object({
  requestId: z.number(),
  attemptCount: z.number(),
});

export const ethereumThresholdSignerCurrentKeyUnavailableEvent = defineEvent(
  'EthereumThresholdSigner.CurrentKeyUnavailable',
  ethereumThresholdSignerCurrentKeyUnavailable,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinThresholdSignerCurrentKeyUnavailable = z.object({
  requestId: z.number(),
  attemptCount: z.number(),
});

export const bitcoinThresholdSignerCurrentKeyUnavailableEvent = defineEvent(
  'BitcoinThresholdSigner.CurrentKeyUnavailable',
  bitcoinThresholdSignerCurrentKeyUnavailable,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerSignersUnavailable = z.object({
  requestId: z.number(),
  attemptCount: z.number(),
});

export const ethereumThresholdSignerSignersUnavailableEvent = defineEvent(
  'EthereumThresholdSigner.SignersUnavailable',
  ethereumThresholdSignerSignersUnavailable,
);

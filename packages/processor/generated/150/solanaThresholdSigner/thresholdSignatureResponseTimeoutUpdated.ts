import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaThresholdSignerThresholdSignatureResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const solanaThresholdSignerThresholdSignatureResponseTimeoutUpdatedEvent = defineEvent(
  'SolanaThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
  solanaThresholdSignerThresholdSignatureResponseTimeoutUpdated,
);

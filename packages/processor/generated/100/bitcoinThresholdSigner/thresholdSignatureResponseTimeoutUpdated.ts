import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdatedEvent = defineEvent(
  'BitcoinThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
  bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated,
);

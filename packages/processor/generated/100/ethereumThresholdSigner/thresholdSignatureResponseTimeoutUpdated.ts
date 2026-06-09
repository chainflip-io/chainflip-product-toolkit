import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdatedEvent = defineEvent(
  'EthereumThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
  ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdated,
);

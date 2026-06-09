import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const evmThresholdSignerThresholdSignatureResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const evmThresholdSignerThresholdSignatureResponseTimeoutUpdatedEvent = defineEvent(
  'EvmThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
  evmThresholdSignerThresholdSignatureResponseTimeoutUpdated,
);

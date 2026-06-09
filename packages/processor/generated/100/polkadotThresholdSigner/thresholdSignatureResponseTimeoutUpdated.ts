import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdatedEvent = defineEvent(
  'PolkadotThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
  polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated,
);

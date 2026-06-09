import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const polkadotThresholdSignerKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'PolkadotThresholdSigner.KeygenResponseTimeoutUpdated',
  polkadotThresholdSignerKeygenResponseTimeoutUpdated,
);

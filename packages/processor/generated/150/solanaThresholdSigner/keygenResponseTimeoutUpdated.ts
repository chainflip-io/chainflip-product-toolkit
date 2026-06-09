import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const solanaThresholdSignerKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'SolanaThresholdSigner.KeygenResponseTimeoutUpdated',
  solanaThresholdSignerKeygenResponseTimeoutUpdated,
);

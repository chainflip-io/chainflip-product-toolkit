import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const ethereumThresholdSignerKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'EthereumThresholdSigner.KeygenResponseTimeoutUpdated',
  ethereumThresholdSignerKeygenResponseTimeoutUpdated,
);

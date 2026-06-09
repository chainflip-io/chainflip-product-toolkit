import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinThresholdSignerKeygenResponseTimeoutUpdated = z.object({
  newTimeout: z.number(),
});

export const bitcoinThresholdSignerKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'BitcoinThresholdSigner.KeygenResponseTimeoutUpdated',
  bitcoinThresholdSignerKeygenResponseTimeoutUpdated,
);

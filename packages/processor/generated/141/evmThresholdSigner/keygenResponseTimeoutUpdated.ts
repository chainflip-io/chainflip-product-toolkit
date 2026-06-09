import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const evmThresholdSignerKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

export const evmThresholdSignerKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'EvmThresholdSigner.KeygenResponseTimeoutUpdated',
  evmThresholdSignerKeygenResponseTimeoutUpdated,
);

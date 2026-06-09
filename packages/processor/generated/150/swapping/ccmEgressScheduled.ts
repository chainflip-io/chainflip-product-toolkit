import { z } from 'zod';
import { cfPrimitivesChainsForeignChain, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingCcmEgressScheduled = z.object({
  ccmId: numberOrHex,
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
});

export const swappingCcmEgressScheduledEvent = defineEvent(
  'Swapping.CcmEgressScheduled',
  swappingCcmEgressScheduled,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const swappingBuyIntervalSet = z.object({ buyInterval: z.number() });

export const swappingBuyIntervalSetEvent = defineEvent(
  'Swapping.BuyIntervalSet',
  swappingBuyIntervalSet,
);

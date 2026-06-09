import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const flipSlashingRateUpdated = z.object({ slashingRate: z.number() });

export const flipSlashingRateUpdatedEvent = defineEvent(
  'Flip.SlashingRateUpdated',
  flipSlashingRateUpdated,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressWitnessSafetyMarginSet = z.object({ margin: z.number() });

export const assethubIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'AssethubIngressEgress.WitnessSafetyMarginSet',
  assethubIngressEgressWitnessSafetyMarginSet,
);

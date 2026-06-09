import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressWitnessSafetyMarginSet = z.object({ margin: z.number() });

export const polkadotIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'PolkadotIngressEgress.WitnessSafetyMarginSet',
  polkadotIngressEgressWitnessSafetyMarginSet,
);

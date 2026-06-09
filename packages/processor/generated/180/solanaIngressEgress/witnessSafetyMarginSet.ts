import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

export const solanaIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'SolanaIngressEgress.WitnessSafetyMarginSet',
  solanaIngressEgressWitnessSafetyMarginSet,
);

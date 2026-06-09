import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

export const arbitrumIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'ArbitrumIngressEgress.WitnessSafetyMarginSet',
  arbitrumIngressEgressWitnessSafetyMarginSet,
);

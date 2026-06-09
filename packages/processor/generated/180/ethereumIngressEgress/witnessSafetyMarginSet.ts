import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

export const ethereumIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'EthereumIngressEgress.WitnessSafetyMarginSet',
  ethereumIngressEgressWitnessSafetyMarginSet,
);

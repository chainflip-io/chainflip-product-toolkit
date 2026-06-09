import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

export const bitcoinIngressEgressWitnessSafetyMarginSetEvent = defineEvent(
  'BitcoinIngressEgress.WitnessSafetyMarginSet',
  bitcoinIngressEgressWitnessSafetyMarginSet,
);

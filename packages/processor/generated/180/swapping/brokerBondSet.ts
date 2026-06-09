import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingBrokerBondSet = z.object({ bond: numberOrHex });

export const swappingBrokerBondSetEvent = defineEvent(
  'Swapping.BrokerBondSet',
  swappingBrokerBondSet,
);

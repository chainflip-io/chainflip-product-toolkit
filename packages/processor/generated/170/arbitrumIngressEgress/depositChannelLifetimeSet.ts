import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

export const arbitrumIngressEgressDepositChannelLifetimeSetEvent = defineEvent(
  'ArbitrumIngressEgress.DepositChannelLifetimeSet',
  arbitrumIngressEgressDepositChannelLifetimeSet,
);

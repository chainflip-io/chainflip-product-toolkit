import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

export const ethereumIngressEgressDepositChannelLifetimeSetEvent = defineEvent(
  'EthereumIngressEgress.DepositChannelLifetimeSet',
  ethereumIngressEgressDepositChannelLifetimeSet,
);

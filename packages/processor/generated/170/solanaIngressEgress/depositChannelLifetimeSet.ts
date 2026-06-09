import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

export const solanaIngressEgressDepositChannelLifetimeSetEvent = defineEvent(
  'SolanaIngressEgress.DepositChannelLifetimeSet',
  solanaIngressEgressDepositChannelLifetimeSet,
);

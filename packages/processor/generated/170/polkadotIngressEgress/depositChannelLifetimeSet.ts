import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: z.number() });

export const polkadotIngressEgressDepositChannelLifetimeSetEvent = defineEvent(
  'PolkadotIngressEgress.DepositChannelLifetimeSet',
  polkadotIngressEgressDepositChannelLifetimeSet,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: z.number() });

export const assethubIngressEgressDepositChannelLifetimeSetEvent = defineEvent(
  'AssethubIngressEgress.DepositChannelLifetimeSet',
  assethubIngressEgressDepositChannelLifetimeSet,
);

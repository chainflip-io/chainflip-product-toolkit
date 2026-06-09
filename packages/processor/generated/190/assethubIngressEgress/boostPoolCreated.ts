import { z } from 'zod';
import { palletCfAssethubIngressEgressBoostPoolIdAssethub } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
});

export const assethubIngressEgressBoostPoolCreatedEvent = defineEvent(
  'AssethubIngressEgress.BoostPoolCreated',
  assethubIngressEgressBoostPoolCreated,
);

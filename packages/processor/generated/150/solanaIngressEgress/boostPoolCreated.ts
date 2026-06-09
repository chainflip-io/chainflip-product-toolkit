import { z } from 'zod';
import { palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
});

export const solanaIngressEgressBoostPoolCreatedEvent = defineEvent(
  'SolanaIngressEgress.BoostPoolCreated',
  solanaIngressEgressBoostPoolCreated,
);

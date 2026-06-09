import { z } from 'zod';
import { palletCfArbitrumIngressEgressBoostPoolIdArbitrum } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
});

export const arbitrumIngressEgressBoostPoolCreatedEvent = defineEvent(
  'ArbitrumIngressEgress.BoostPoolCreated',
  arbitrumIngressEgressBoostPoolCreated,
);

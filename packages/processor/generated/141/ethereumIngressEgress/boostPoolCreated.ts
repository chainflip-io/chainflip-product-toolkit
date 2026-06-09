import { z } from 'zod';
import { palletCfEthereumIngressEgressBoostPoolIdEthereum } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
});

export const ethereumIngressEgressBoostPoolCreatedEvent = defineEvent(
  'EthereumIngressEgress.BoostPoolCreated',
  ethereumIngressEgressBoostPoolCreated,
);

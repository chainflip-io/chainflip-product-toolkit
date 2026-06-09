import { z } from 'zod';
import { palletCfPolkadotIngressEgressBoostPoolIdPolkadot } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
});

export const polkadotIngressEgressBoostPoolCreatedEvent = defineEvent(
  'PolkadotIngressEgress.BoostPoolCreated',
  polkadotIngressEgressBoostPoolCreated,
);

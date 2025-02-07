import { z } from 'zod';
import { palletCfPolkadotIngressEgressBoostPoolIdPolkadot } from '../common';

export const polkadotIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
});

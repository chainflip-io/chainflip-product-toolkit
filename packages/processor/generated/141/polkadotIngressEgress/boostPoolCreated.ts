import { z } from 'zod';
import { palletCfIngressEgressBoostPoolIdPolkadot } from '../common';

export const polkadotIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfIngressEgressBoostPoolIdPolkadot,
});

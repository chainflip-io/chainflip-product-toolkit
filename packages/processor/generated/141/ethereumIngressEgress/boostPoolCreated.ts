import { z } from 'zod';
import { palletCfIngressEgressBoostPoolIdEthereum } from '../common';

export const ethereumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfIngressEgressBoostPoolIdEthereum,
});

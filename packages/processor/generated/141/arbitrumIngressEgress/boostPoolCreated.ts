import { z } from 'zod';
import { palletCfIngressEgressBoostPoolIdArbitrum } from '../common';

export const arbitrumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfIngressEgressBoostPoolIdArbitrum,
});

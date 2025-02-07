import { z } from 'zod';
import { palletCfArbitrumIngressEgressBoostPoolIdArbitrum } from '../common';

export const arbitrumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
});

import { z } from 'zod';
import { palletCfIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfIngressEgressBoostPoolIdSolana,
});

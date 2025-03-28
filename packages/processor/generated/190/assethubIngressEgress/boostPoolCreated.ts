import { z } from 'zod';
import { palletCfAssethubIngressEgressBoostPoolIdAssethub } from '../common';

export const assethubIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
});

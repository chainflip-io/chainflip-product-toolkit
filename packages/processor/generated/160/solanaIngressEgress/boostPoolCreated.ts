import { z } from 'zod';
import { palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
});

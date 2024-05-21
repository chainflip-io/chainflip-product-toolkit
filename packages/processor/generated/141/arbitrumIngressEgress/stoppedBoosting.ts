import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdArbitrum } from '../common';

export const arbitrumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdArbitrum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

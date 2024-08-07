import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdSolana,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

import { z } from 'zod';
import { accountId, numberOrHex, palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

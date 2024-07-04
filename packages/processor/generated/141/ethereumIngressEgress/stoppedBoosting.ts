import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdEthereum } from '../common';

export const ethereumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdEthereum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

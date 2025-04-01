import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfAssethubIngressEgressBoostPoolIdAssethub,
} from '../common';

export const assethubIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

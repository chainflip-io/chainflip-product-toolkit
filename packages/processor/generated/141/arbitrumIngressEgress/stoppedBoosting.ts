import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
} from '../common';

export const arbitrumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

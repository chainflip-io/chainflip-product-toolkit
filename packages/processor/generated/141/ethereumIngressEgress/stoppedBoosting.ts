import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfEthereumIngressEgressBoostPoolIdEthereum,
} from '../common';

export const ethereumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdBitcoin,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

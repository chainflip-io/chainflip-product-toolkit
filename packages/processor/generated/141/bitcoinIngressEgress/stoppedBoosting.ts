import { z } from 'zod';
import { accountId, numberOrHex, palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

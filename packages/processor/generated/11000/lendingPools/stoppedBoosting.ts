import { z } from 'zod';
import { accountId, numberOrHex, palletCfLendingPoolsBoostPoolId } from '../common';

export const lendingPoolsStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfLendingPoolsBoostPoolId,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

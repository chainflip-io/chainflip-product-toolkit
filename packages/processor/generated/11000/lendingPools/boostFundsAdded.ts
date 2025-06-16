import { z } from 'zod';
import { accountId, numberOrHex, palletCfLendingPoolsBoostPoolId } from '../common';

export const lendingPoolsBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfLendingPoolsBoostPoolId,
  amount: numberOrHex,
});

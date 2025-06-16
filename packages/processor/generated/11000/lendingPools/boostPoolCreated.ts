import { z } from 'zod';
import { palletCfLendingPoolsBoostPoolId } from '../common';

export const lendingPoolsBoostPoolCreated = z.object({
  boostPool: palletCfLendingPoolsBoostPoolId,
});

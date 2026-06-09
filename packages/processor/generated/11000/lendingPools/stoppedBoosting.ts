import { z } from 'zod';
import { accountId, numberOrHex, palletCfLendingPoolsBoostPoolId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfLendingPoolsBoostPoolId,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const lendingPoolsStoppedBoostingEvent = defineEvent(
  'LendingPools.StoppedBoosting',
  lendingPoolsStoppedBoosting,
);

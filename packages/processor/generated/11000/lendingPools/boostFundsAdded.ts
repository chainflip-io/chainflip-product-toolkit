import { z } from 'zod';
import { accountId, numberOrHex, palletCfLendingPoolsBoostPoolId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfLendingPoolsBoostPoolId,
  amount: numberOrHex,
});

export const lendingPoolsBoostFundsAddedEvent = defineEvent(
  'LendingPools.BoostFundsAdded',
  lendingPoolsBoostFundsAdded,
);

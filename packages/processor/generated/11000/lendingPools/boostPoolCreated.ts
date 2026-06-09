import { z } from 'zod';
import { palletCfLendingPoolsBoostPoolId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsBoostPoolCreated = z.object({
  boostPool: palletCfLendingPoolsBoostPoolId,
});

export const lendingPoolsBoostPoolCreatedEvent = defineEvent(
  'LendingPools.BoostPoolCreated',
  lendingPoolsBoostPoolCreated,
);

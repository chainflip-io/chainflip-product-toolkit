import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const lendingPoolsLiquidationInitiated = z.object({
  borrowerId: accountId,
  swaps: z.array(z.tuple([numberOrHex, z.array(numberOrHex)])),
  isHard: z.boolean(),
});

export const lendingPoolsLiquidationInitiatedEvent = defineEvent(
  'LendingPools.LiquidationInitiated',
  lendingPoolsLiquidationInitiated,
);

import { z } from 'zod';
import { accountId, numberOrHex } from '../common';

export const validatorMaxBidUpdated = z.object({
  delegator: accountId,
  maxBid: numberOrHex.nullish(),
});

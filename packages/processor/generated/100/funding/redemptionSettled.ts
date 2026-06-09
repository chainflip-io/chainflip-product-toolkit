import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const fundingRedemptionSettled = z.tuple([accountId, numberOrHex]);

export const fundingRedemptionSettledEvent = defineEvent(
  'Funding.RedemptionSettled',
  fundingRedemptionSettled,
);

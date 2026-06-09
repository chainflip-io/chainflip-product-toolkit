import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const fundingRedemptionExpired = z.object({ accountId });

export const fundingRedemptionExpiredEvent = defineEvent(
  'Funding.RedemptionExpired',
  fundingRedemptionExpired,
);

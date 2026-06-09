import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const fundingStoppedBidding = z.object({ accountId });

export const fundingStoppedBiddingEvent = defineEvent(
  'Funding.StoppedBidding',
  fundingStoppedBidding,
);

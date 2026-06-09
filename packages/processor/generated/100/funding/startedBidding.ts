import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const fundingStartedBidding = z.object({ accountId });

export const fundingStartedBiddingEvent = defineEvent(
  'Funding.StartedBidding',
  fundingStartedBidding,
);

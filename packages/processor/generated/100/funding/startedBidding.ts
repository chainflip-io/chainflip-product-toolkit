import { z } from 'zod';
import { accountId } from '../common';

export const fundingStartedBidding = z.object({ accountId });

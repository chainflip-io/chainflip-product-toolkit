import { z } from 'zod';
import { accountId } from '../common';

export const swappingAffiliateRegistration = z.object({
  brokerId: accountId,
  shortId: z.number(),
  affiliateId: accountId,
});

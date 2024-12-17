import { z } from 'zod';
import { accountId } from '../common';

export const swappingAffiliateRegistrationUpdated = z.object({
  brokerId: accountId,
  affiliateShortId: z.number(),
  affiliateId: accountId,
  previousAffiliateId: accountId.nullish(),
});

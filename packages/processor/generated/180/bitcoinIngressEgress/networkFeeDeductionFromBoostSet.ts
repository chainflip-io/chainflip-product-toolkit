import { z } from 'zod';

export const bitcoinIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

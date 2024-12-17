import { z } from 'zod';

export const arbitrumIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

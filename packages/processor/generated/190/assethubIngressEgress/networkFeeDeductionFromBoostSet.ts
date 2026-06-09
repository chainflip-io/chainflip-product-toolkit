import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const assethubIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'AssethubIngressEgress.NetworkFeeDeductionFromBoostSet',
  assethubIngressEgressNetworkFeeDeductionFromBoostSet,
);

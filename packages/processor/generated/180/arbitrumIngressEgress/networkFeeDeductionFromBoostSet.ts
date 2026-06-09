import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const arbitrumIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'ArbitrumIngressEgress.NetworkFeeDeductionFromBoostSet',
  arbitrumIngressEgressNetworkFeeDeductionFromBoostSet,
);

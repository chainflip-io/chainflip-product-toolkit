import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const ethereumIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'EthereumIngressEgress.NetworkFeeDeductionFromBoostSet',
  ethereumIngressEgressNetworkFeeDeductionFromBoostSet,
);

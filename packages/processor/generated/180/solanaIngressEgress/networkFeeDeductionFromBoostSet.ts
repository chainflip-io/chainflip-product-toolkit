import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const solanaIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'SolanaIngressEgress.NetworkFeeDeductionFromBoostSet',
  solanaIngressEgressNetworkFeeDeductionFromBoostSet,
);

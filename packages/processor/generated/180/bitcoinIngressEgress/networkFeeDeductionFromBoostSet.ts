import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const bitcoinIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'BitcoinIngressEgress.NetworkFeeDeductionFromBoostSet',
  bitcoinIngressEgressNetworkFeeDeductionFromBoostSet,
);

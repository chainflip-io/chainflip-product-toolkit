import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressNetworkFeeDeductionFromBoostSet = z.object({
  deductionPercent: z.number(),
});

export const polkadotIngressEgressNetworkFeeDeductionFromBoostSetEvent = defineEvent(
  'PolkadotIngressEgress.NetworkFeeDeductionFromBoostSet',
  polkadotIngressEgressNetworkFeeDeductionFromBoostSet,
);

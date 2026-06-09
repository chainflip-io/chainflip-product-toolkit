import { z } from 'zod';
import {
  palletCfArbitrumIngressEgressDepositWitnessArbitrum,
  spRuntimeDispatchError,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfArbitrumIngressEgressDepositWitnessArbitrum,
});

export const arbitrumIngressEgressDepositWitnessRejectedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositWitnessRejected',
  arbitrumIngressEgressDepositWitnessRejected,
);

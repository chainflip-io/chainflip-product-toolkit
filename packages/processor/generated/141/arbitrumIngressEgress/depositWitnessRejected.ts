import { z } from 'zod';
import { palletCfIngressEgressDepositWitnessArbitrum, spRuntimeDispatchError } from '../common';

export const arbitrumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfIngressEgressDepositWitnessArbitrum,
});

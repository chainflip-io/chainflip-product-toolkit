import { z } from 'zod';
import { palletCfIngressEgressDepositWitnessEthereum, spRuntimeDispatchError } from '../common';

export const ethereumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfIngressEgressDepositWitnessEthereum,
});

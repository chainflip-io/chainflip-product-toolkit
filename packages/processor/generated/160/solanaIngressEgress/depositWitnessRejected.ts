import { z } from 'zod';
import { palletCfIngressEgressDepositWitnessSolana, spRuntimeDispatchError } from '../common';

export const solanaIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfIngressEgressDepositWitnessSolana,
});

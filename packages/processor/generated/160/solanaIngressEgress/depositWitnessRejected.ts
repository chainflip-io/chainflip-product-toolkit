import { z } from 'zod';
import { palletCfSolanaIngressEgressDepositWitnessSolana, spRuntimeDispatchError } from '../common';

export const solanaIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfSolanaIngressEgressDepositWitnessSolana,
});

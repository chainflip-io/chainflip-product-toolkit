import { z } from 'zod';
import { palletCfSolanaIngressEgressDepositWitnessSolana, spRuntimeDispatchError } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfSolanaIngressEgressDepositWitnessSolana,
});

export const solanaIngressEgressDepositWitnessRejectedEvent = defineEvent(
  'SolanaIngressEgress.DepositWitnessRejected',
  solanaIngressEgressDepositWitnessRejected,
);

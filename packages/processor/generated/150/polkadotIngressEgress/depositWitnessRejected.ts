import { z } from 'zod';
import { palletCfIngressEgressDepositWitnessPolkadot, spRuntimeDispatchError } from '../common';

export const polkadotIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfIngressEgressDepositWitnessPolkadot,
});

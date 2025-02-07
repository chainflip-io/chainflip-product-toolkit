import { z } from 'zod';
import {
  palletCfArbitrumIngressEgressDepositWitnessArbitrum,
  spRuntimeDispatchError,
} from '../common';

export const arbitrumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfArbitrumIngressEgressDepositWitnessArbitrum,
});

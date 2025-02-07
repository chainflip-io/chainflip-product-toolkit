import { z } from 'zod';
import {
  palletCfEthereumIngressEgressDepositWitnessEthereum,
  spRuntimeDispatchError,
} from '../common';

export const ethereumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfEthereumIngressEgressDepositWitnessEthereum,
});

import { z } from 'zod';
import {
  palletCfPolkadotIngressEgressDepositWitnessPolkadot,
  spRuntimeDispatchError,
} from '../common';

export const polkadotIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfPolkadotIngressEgressDepositWitnessPolkadot,
});

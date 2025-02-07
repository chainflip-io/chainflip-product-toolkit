import { z } from 'zod';
import {
  palletCfBitcoinIngressEgressDepositWitnessBitcoin,
  spRuntimeDispatchError,
} from '../common';

export const bitcoinIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfBitcoinIngressEgressDepositWitnessBitcoin,
});

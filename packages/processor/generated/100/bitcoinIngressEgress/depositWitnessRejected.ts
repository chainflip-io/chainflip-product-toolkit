import { z } from 'zod';
import {
  palletCfBitcoinIngressEgressDepositWitnessBitcoin,
  spRuntimeDispatchError,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfBitcoinIngressEgressDepositWitnessBitcoin,
});

export const bitcoinIngressEgressDepositWitnessRejectedEvent = defineEvent(
  'BitcoinIngressEgress.DepositWitnessRejected',
  bitcoinIngressEgressDepositWitnessRejected,
);

import { z } from 'zod';
import {
  palletCfPolkadotIngressEgressDepositWitnessPolkadot,
  spRuntimeDispatchError,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfPolkadotIngressEgressDepositWitnessPolkadot,
});

export const polkadotIngressEgressDepositWitnessRejectedEvent = defineEvent(
  'PolkadotIngressEgress.DepositWitnessRejected',
  polkadotIngressEgressDepositWitnessRejected,
);

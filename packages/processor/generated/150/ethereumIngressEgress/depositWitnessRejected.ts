import { z } from 'zod';
import {
  palletCfEthereumIngressEgressDepositWitnessEthereum,
  spRuntimeDispatchError,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositWitnessRejected = z.object({
  reason: spRuntimeDispatchError,
  depositWitness: palletCfEthereumIngressEgressDepositWitnessEthereum,
});

export const ethereumIngressEgressDepositWitnessRejectedEvent = defineEvent(
  'EthereumIngressEgress.DepositWitnessRejected',
  ethereumIngressEgressDepositWitnessRejected,
);

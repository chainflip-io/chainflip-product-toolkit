import { z } from 'zod';
import { cfPrimitivesChainsForeignChain, numberOrHex, spRuntimeDispatchError } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressCcmEgressInvalid = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  error: spRuntimeDispatchError,
});

export const polkadotIngressEgressCcmEgressInvalidEvent = defineEvent(
  'PolkadotIngressEgress.CcmEgressInvalid',
  polkadotIngressEgressCcmEgressInvalid,
);

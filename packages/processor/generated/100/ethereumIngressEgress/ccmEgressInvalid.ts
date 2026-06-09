import { z } from 'zod';
import { cfPrimitivesChainsForeignChain, numberOrHex, spRuntimeDispatchError } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressCcmEgressInvalid = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  error: spRuntimeDispatchError,
});

export const ethereumIngressEgressCcmEgressInvalidEvent = defineEvent(
  'EthereumIngressEgress.CcmEgressInvalid',
  ethereumIngressEgressCcmEgressInvalid,
);

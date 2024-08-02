import { z } from 'zod';
import { cfPrimitivesChainsForeignChain, numberOrHex, spRuntimeDispatchError } from '../common';

export const arbitrumIngressEgressCcmEgressInvalid = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  error: spRuntimeDispatchError,
});

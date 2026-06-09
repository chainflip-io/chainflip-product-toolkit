import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const arbitrumIngressEgressStoppedBoostingEvent = defineEvent(
  'ArbitrumIngressEgress.StoppedBoosting',
  arbitrumIngressEgressStoppedBoosting,
);

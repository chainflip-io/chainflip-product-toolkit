import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfAssethubIngressEgressBoostPoolIdAssethub,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const assethubIngressEgressStoppedBoostingEvent = defineEvent(
  'AssethubIngressEgress.StoppedBoosting',
  assethubIngressEgressStoppedBoosting,
);

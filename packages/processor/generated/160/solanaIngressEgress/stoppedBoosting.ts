import { z } from 'zod';
import { accountId, numberOrHex, palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const solanaIngressEgressStoppedBoostingEvent = defineEvent(
  'SolanaIngressEgress.StoppedBoosting',
  solanaIngressEgressStoppedBoosting,
);

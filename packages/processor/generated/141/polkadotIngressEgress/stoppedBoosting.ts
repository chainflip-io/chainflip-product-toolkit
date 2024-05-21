import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdPolkadot } from '../common';

export const polkadotIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdPolkadot,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
} from '../common';

export const polkadotIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

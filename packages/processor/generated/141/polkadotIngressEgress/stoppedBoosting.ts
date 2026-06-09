import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const polkadotIngressEgressStoppedBoostingEvent = defineEvent(
  'PolkadotIngressEgress.StoppedBoosting',
  polkadotIngressEgressStoppedBoosting,
);

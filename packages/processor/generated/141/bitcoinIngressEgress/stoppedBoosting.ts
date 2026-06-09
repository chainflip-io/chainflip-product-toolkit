import { z } from 'zod';
import { accountId, numberOrHex, palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const bitcoinIngressEgressStoppedBoostingEvent = defineEvent(
  'BitcoinIngressEgress.StoppedBoosting',
  bitcoinIngressEgressStoppedBoosting,
);

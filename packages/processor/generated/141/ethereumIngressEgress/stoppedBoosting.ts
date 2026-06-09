import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfEthereumIngressEgressBoostPoolIdEthereum,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressStoppedBoosting = z.object({
  boosterId: accountId,
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
  unlockedAmount: numberOrHex,
  pendingBoosts: z.array(numberOrHex),
});

export const ethereumIngressEgressStoppedBoostingEvent = defineEvent(
  'EthereumIngressEgress.StoppedBoosting',
  ethereumIngressEgressStoppedBoosting,
);

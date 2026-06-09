import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
  amount: numberOrHex,
});

export const arbitrumIngressEgressBoostFundsAddedEvent = defineEvent(
  'ArbitrumIngressEgress.BoostFundsAdded',
  arbitrumIngressEgressBoostFundsAdded,
);

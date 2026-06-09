import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfAssethubIngressEgressBoostPoolIdAssethub,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
  amount: numberOrHex,
});

export const assethubIngressEgressBoostFundsAddedEvent = defineEvent(
  'AssethubIngressEgress.BoostFundsAdded',
  assethubIngressEgressBoostFundsAdded,
);

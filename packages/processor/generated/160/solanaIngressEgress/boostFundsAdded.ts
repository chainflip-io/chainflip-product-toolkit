import { z } from 'zod';
import { accountId, numberOrHex, palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
  amount: numberOrHex,
});

export const solanaIngressEgressBoostFundsAddedEvent = defineEvent(
  'SolanaIngressEgress.BoostFundsAdded',
  solanaIngressEgressBoostFundsAdded,
);

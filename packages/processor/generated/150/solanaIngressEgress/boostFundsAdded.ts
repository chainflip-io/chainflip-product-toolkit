import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdSolana,
  amount: numberOrHex,
});

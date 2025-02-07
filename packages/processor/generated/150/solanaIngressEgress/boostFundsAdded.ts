import { z } from 'zod';
import { accountId, numberOrHex, palletCfSolanaIngressEgressBoostPoolIdSolana } from '../common';

export const solanaIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfSolanaIngressEgressBoostPoolIdSolana,
  amount: numberOrHex,
});

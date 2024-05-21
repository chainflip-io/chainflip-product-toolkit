import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdEthereum } from '../common';

export const ethereumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdEthereum,
  amount: numberOrHex,
});

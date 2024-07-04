import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdArbitrum } from '../common';

export const arbitrumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdArbitrum,
  amount: numberOrHex,
});

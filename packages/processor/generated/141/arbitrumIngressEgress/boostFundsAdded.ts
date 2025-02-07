import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
} from '../common';

export const arbitrumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfArbitrumIngressEgressBoostPoolIdArbitrum,
  amount: numberOrHex,
});

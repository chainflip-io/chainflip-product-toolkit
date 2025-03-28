import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfAssethubIngressEgressBoostPoolIdAssethub,
} from '../common';

export const assethubIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfAssethubIngressEgressBoostPoolIdAssethub,
  amount: numberOrHex,
});

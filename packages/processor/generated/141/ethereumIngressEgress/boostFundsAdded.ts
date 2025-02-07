import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfEthereumIngressEgressBoostPoolIdEthereum,
} from '../common';

export const ethereumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
  amount: numberOrHex,
});

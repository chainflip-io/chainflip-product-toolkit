import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdBitcoin,
  amount: numberOrHex,
});

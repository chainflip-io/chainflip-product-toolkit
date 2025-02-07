import { z } from 'zod';
import { accountId, numberOrHex, palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
  amount: numberOrHex,
});

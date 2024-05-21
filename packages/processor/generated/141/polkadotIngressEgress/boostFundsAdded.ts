import { z } from 'zod';
import { accountId, numberOrHex, palletCfIngressEgressBoostPoolIdPolkadot } from '../common';

export const polkadotIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfIngressEgressBoostPoolIdPolkadot,
  amount: numberOrHex,
});

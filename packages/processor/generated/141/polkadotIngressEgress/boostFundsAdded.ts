import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
} from '../common';

export const polkadotIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
  amount: numberOrHex,
});

import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfPolkadotIngressEgressBoostPoolIdPolkadot,
  amount: numberOrHex,
});

export const polkadotIngressEgressBoostFundsAddedEvent = defineEvent(
  'PolkadotIngressEgress.BoostFundsAdded',
  polkadotIngressEgressBoostFundsAdded,
);

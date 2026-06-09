import { z } from 'zod';
import { accountId, numberOrHex, palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
  amount: numberOrHex,
});

export const bitcoinIngressEgressBoostFundsAddedEvent = defineEvent(
  'BitcoinIngressEgress.BoostFundsAdded',
  bitcoinIngressEgressBoostFundsAdded,
);

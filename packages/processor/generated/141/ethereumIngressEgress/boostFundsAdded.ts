import { z } from 'zod';
import {
  accountId,
  numberOrHex,
  palletCfEthereumIngressEgressBoostPoolIdEthereum,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressBoostFundsAdded = z.object({
  boosterId: accountId,
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
  amount: numberOrHex,
});

export const ethereumIngressEgressBoostFundsAddedEvent = defineEvent(
  'EthereumIngressEgress.BoostFundsAdded',
  ethereumIngressEgressBoostFundsAdded,
);

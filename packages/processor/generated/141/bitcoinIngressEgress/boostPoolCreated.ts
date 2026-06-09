import { z } from 'zod';
import { palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
});

export const bitcoinIngressEgressBoostPoolCreatedEvent = defineEvent(
  'BitcoinIngressEgress.BoostPoolCreated',
  bitcoinIngressEgressBoostPoolCreated,
);

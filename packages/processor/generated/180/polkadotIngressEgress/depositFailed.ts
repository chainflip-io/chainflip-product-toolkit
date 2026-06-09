import { z } from 'zod';
import {
  palletCfPolkadotIngressEgressDepositFailedDetails,
  palletCfPolkadotIngressEgressDepositFailedReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositFailed = z.object({
  blockHeight: z.number(),
  reason: palletCfPolkadotIngressEgressDepositFailedReason,
  details: palletCfPolkadotIngressEgressDepositFailedDetails,
});

export const polkadotIngressEgressDepositFailedEvent = defineEvent(
  'PolkadotIngressEgress.DepositFailed',
  polkadotIngressEgressDepositFailed,
);

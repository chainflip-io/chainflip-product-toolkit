import { z } from 'zod';
import {
  numberOrHex,
  palletCfArbitrumIngressEgressDepositFailedDetails,
  palletCfArbitrumIngressEgressDepositFailedReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfArbitrumIngressEgressDepositFailedReason,
  details: palletCfArbitrumIngressEgressDepositFailedDetails,
});

export const arbitrumIngressEgressDepositFailedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositFailed',
  arbitrumIngressEgressDepositFailed,
);

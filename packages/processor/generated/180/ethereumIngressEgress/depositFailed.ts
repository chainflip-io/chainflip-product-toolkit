import { z } from 'zod';
import {
  numberOrHex,
  palletCfEthereumIngressEgressDepositFailedDetails,
  palletCfEthereumIngressEgressDepositFailedReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfEthereumIngressEgressDepositFailedReason,
  details: palletCfEthereumIngressEgressDepositFailedDetails,
});

export const ethereumIngressEgressDepositFailedEvent = defineEvent(
  'EthereumIngressEgress.DepositFailed',
  ethereumIngressEgressDepositFailed,
);

import { z } from 'zod';
import {
  numberOrHex,
  palletCfSolanaIngressEgressDepositFailedDetails,
  palletCfSolanaIngressEgressDepositFailedReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfSolanaIngressEgressDepositFailedReason,
  details: palletCfSolanaIngressEgressDepositFailedDetails,
});

export const solanaIngressEgressDepositFailedEvent = defineEvent(
  'SolanaIngressEgress.DepositFailed',
  solanaIngressEgressDepositFailed,
);

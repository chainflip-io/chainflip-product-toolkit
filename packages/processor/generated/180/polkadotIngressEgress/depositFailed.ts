import { z } from 'zod';
import {
  palletCfIngressEgressDepositFailedDetails,
  palletCfIngressEgressDepositFailedReason,
} from '../common';

export const polkadotIngressEgressDepositFailed = z.object({
  blockHeight: z.number(),
  reason: palletCfIngressEgressDepositFailedReason,
  details: palletCfIngressEgressDepositFailedDetails,
});

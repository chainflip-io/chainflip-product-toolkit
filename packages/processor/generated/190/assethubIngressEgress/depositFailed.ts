import { z } from 'zod';
import {
  palletCfAssethubIngressEgressDepositFailedDetails,
  palletCfAssethubIngressEgressDepositFailedReason,
} from '../common';

export const assethubIngressEgressDepositFailed = z.object({
  blockHeight: z.number(),
  reason: palletCfAssethubIngressEgressDepositFailedReason,
  details: palletCfAssethubIngressEgressDepositFailedDetails,
});

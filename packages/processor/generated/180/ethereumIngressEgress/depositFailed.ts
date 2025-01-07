import { z } from 'zod';
import {
  numberOrHex,
  palletCfIngressEgressDepositFailedDetails,
  palletCfIngressEgressDepositFailedReason,
} from '../common';

export const ethereumIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfIngressEgressDepositFailedReason,
  details: palletCfIngressEgressDepositFailedDetails,
});

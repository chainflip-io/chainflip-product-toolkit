import { z } from 'zod';
import {
  numberOrHex,
  palletCfIngressEgressDepositFailedDetails,
  palletCfIngressEgressDepositFailedReason,
} from '../common';

export const solanaIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfIngressEgressDepositFailedReason,
  details: palletCfIngressEgressDepositFailedDetails,
});

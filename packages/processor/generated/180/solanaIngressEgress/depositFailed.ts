import { z } from 'zod';
import {
  numberOrHex,
  palletCfSolanaIngressEgressDepositFailedDetails,
  palletCfSolanaIngressEgressDepositFailedReason,
} from '../common';

export const solanaIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfSolanaIngressEgressDepositFailedReason,
  details: palletCfSolanaIngressEgressDepositFailedDetails,
});

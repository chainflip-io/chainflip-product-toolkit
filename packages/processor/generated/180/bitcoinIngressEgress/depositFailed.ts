import { z } from 'zod';
import {
  numberOrHex,
  palletCfBitcoinIngressEgressDepositFailedDetails,
  palletCfBitcoinIngressEgressDepositFailedReason,
} from '../common';

export const bitcoinIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfBitcoinIngressEgressDepositFailedReason,
  details: palletCfBitcoinIngressEgressDepositFailedDetails,
});

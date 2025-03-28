import { z } from 'zod';
import {
  numberOrHex,
  palletCfEthereumIngressEgressDepositFailedDetails,
  palletCfEthereumIngressEgressDepositFailedReason,
} from '../common';

export const ethereumIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfEthereumIngressEgressDepositFailedReason,
  details: palletCfEthereumIngressEgressDepositFailedDetails,
});

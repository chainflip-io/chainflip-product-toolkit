import { z } from 'zod';
import {
  numberOrHex,
  palletCfArbitrumIngressEgressDepositFailedDetails,
  palletCfArbitrumIngressEgressDepositFailedReason,
} from '../common';

export const arbitrumIngressEgressDepositFailed = z.object({
  blockHeight: numberOrHex,
  reason: palletCfArbitrumIngressEgressDepositFailedReason,
  details: palletCfArbitrumIngressEgressDepositFailedDetails,
});

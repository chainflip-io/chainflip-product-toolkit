import { z } from 'zod';
import {
  palletCfPolkadotIngressEgressDepositFailedDetails,
  palletCfPolkadotIngressEgressDepositFailedReason,
} from '../common';

export const polkadotIngressEgressDepositFailed = z.object({
  blockHeight: z.number(),
  reason: palletCfPolkadotIngressEgressDepositFailedReason,
  details: palletCfPolkadotIngressEgressDepositFailedDetails,
});

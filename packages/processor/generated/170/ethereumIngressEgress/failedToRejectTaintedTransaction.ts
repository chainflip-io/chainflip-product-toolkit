import { z } from 'zod';
import { cfChainsEvmDepositDetails } from '../common';

export const ethereumIngressEgressFailedToRejectTaintedTransaction = z.object({
  txId: cfChainsEvmDepositDetails,
});

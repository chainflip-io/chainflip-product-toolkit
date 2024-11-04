import { z } from 'zod';
import { cfChainsEvmDepositDetails } from '../common';

export const arbitrumIngressEgressFailedToRejectTaintedTransaction = z.object({
  txId: cfChainsEvmDepositDetails,
});

import { z } from 'zod';
import { cfChainsBtcUtxo } from '../common';

export const bitcoinIngressEgressFailedToRejectTaintedTransaction = z.object({
  txId: cfChainsBtcUtxo,
});

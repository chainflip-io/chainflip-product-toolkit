import { z } from 'zod';
import { cfChainsBtcUtxo } from '../common';

export const bitcoinIngressEgressTaintedTransactionRejected = z.object({
  broadcastId: z.number(),
  txId: cfChainsBtcUtxo,
});

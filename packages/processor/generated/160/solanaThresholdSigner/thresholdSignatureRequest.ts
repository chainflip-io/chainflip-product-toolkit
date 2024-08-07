import { z } from 'zod';
import { accountId, cfChainsSolSolTxCoreMessage, hexString, numberOrHex } from '../common';

export const solanaThresholdSignerThresholdSignatureRequest = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
  epoch: z.number(),
  key: hexString,
  signatories: z.array(accountId),
  payload: cfChainsSolSolTxCoreMessage,
});

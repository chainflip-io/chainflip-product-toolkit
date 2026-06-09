import { z } from 'zod';
import { accountId, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaThresholdSignerThresholdSignatureRequest = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
  epoch: z.number(),
  key: hexString,
  signatories: z.array(accountId),
});

export const solanaThresholdSignerThresholdSignatureRequestEvent = defineEvent(
  'SolanaThresholdSigner.ThresholdSignatureRequest',
  solanaThresholdSignerThresholdSignatureRequest,
);

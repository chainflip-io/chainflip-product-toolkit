import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerThresholdSignatureSuccess = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
});

export const ethereumThresholdSignerThresholdSignatureSuccessEvent = defineEvent(
  'EthereumThresholdSigner.ThresholdSignatureSuccess',
  ethereumThresholdSignerThresholdSignatureSuccess,
);

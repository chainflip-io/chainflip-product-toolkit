import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerThresholdSignatureFailed = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
  offenders: z.array(accountId),
});

export const ethereumThresholdSignerThresholdSignatureFailedEvent = defineEvent(
  'EthereumThresholdSigner.ThresholdSignatureFailed',
  ethereumThresholdSignerThresholdSignatureFailed,
);

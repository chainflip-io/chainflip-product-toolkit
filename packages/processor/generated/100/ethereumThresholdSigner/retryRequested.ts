import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerRetryRequested = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
});

export const ethereumThresholdSignerRetryRequestedEvent = defineEvent(
  'EthereumThresholdSigner.RetryRequested',
  ethereumThresholdSignerRetryRequested,
);

import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerFailureReportProcessed = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
  reporterId: accountId,
});

export const ethereumThresholdSignerFailureReportProcessedEvent = defineEvent(
  'EthereumThresholdSigner.FailureReportProcessed',
  ethereumThresholdSignerFailureReportProcessed,
);

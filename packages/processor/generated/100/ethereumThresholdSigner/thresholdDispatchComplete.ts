import { z } from 'zod';
import { dispatchResult, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerThresholdDispatchComplete = z.object({
  requestId: z.number(),
  ceremonyId: numberOrHex,
  result: dispatchResult,
});

export const ethereumThresholdSignerThresholdDispatchCompleteEvent = defineEvent(
  'EthereumThresholdSigner.ThresholdDispatchComplete',
  ethereumThresholdSignerThresholdDispatchComplete,
);

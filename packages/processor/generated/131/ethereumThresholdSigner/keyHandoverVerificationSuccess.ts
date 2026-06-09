import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverVerificationSuccess = z.object({
  aggKey: cfChainsEvmAggKey,
});

export const ethereumThresholdSignerKeyHandoverVerificationSuccessEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverVerificationSuccess',
  ethereumThresholdSignerKeyHandoverVerificationSuccess,
);

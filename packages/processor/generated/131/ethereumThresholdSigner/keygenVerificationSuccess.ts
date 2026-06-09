import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenVerificationSuccess = z.object({
  aggKey: cfChainsEvmAggKey,
});

export const ethereumThresholdSignerKeygenVerificationSuccessEvent = defineEvent(
  'EthereumThresholdSigner.KeygenVerificationSuccess',
  ethereumThresholdSignerKeygenVerificationSuccess,
);

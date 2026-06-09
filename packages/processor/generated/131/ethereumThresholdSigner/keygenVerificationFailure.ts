import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenVerificationFailure = z.object({
  keygenCeremonyId: numberOrHex,
});

export const ethereumThresholdSignerKeygenVerificationFailureEvent = defineEvent(
  'EthereumThresholdSigner.KeygenVerificationFailure',
  ethereumThresholdSignerKeygenVerificationFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

export const ethereumThresholdSignerKeyHandoverVerificationFailureEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverVerificationFailure',
  ethereumThresholdSignerKeyHandoverVerificationFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumThresholdSignerKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

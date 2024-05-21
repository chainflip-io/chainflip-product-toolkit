import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumVaultKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

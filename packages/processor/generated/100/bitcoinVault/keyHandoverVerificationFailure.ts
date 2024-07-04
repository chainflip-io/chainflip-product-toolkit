import { z } from 'zod';
import { numberOrHex } from '../common';

export const bitcoinVaultKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

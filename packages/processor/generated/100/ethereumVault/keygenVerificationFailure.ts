import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumVaultKeygenVerificationFailure = z.object({ keygenCeremonyId: numberOrHex });

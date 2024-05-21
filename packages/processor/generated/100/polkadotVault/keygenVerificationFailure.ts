import { z } from 'zod';
import { numberOrHex } from '../common';

export const polkadotVaultKeygenVerificationFailure = z.object({ keygenCeremonyId: numberOrHex });

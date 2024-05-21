import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumVaultKeyHandoverFailure = z.object({ ceremonyId: numberOrHex });

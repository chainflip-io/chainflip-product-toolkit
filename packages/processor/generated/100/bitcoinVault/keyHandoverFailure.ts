import { z } from 'zod';
import { numberOrHex } from '../common';

export const bitcoinVaultKeyHandoverFailure = z.object({ ceremonyId: numberOrHex });

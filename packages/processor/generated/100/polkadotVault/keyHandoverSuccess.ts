import { z } from 'zod';
import { numberOrHex } from '../common';

export const polkadotVaultKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

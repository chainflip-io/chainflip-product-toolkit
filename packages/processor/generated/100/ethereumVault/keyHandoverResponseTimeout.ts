import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumVaultKeyHandoverResponseTimeout = z.object({ ceremonyId: numberOrHex });

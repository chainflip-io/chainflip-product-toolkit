import { z } from 'zod';
import { numberOrHex } from '../common';

export const polkadotVaultKeyHandoverResponseTimeout = z.object({ ceremonyId: numberOrHex });

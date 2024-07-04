import { z } from 'zod';
import { hexString } from '../common';

export const polkadotVaultKeyHandoverVerificationSuccess = z.object({ aggKey: hexString });

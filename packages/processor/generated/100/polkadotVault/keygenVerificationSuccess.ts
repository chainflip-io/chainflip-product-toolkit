import { z } from 'zod';
import { hexString } from '../common';

export const polkadotVaultKeygenVerificationSuccess = z.object({ aggKey: hexString });

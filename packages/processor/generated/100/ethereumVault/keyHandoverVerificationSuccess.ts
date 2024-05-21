import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';

export const ethereumVaultKeyHandoverVerificationSuccess = z.object({ aggKey: cfChainsEvmAggKey });

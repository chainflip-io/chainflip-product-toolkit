import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';

export const ethereumVaultKeygenVerificationSuccess = z.object({ aggKey: cfChainsEvmAggKey });

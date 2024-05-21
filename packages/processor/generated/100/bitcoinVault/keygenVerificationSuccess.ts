import { z } from 'zod';
import { cfChainsBtcAggKey } from '../common';

export const bitcoinVaultKeygenVerificationSuccess = z.object({ aggKey: cfChainsBtcAggKey });

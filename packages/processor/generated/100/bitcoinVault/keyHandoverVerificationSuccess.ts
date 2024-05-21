import { z } from 'zod';
import { cfChainsBtcAggKey } from '../common';

export const bitcoinVaultKeyHandoverVerificationSuccess = z.object({ aggKey: cfChainsBtcAggKey });

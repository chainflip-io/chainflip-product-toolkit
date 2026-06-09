import { z } from 'zod';
import { cfChainsBtcAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverVerificationSuccess = z.object({ aggKey: cfChainsBtcAggKey });

export const bitcoinVaultKeyHandoverVerificationSuccessEvent = defineEvent(
  'BitcoinVault.KeyHandoverVerificationSuccess',
  bitcoinVaultKeyHandoverVerificationSuccess,
);

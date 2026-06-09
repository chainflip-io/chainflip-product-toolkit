import { z } from 'zod';
import { cfChainsBtcAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenVerificationSuccess = z.object({ aggKey: cfChainsBtcAggKey });

export const bitcoinVaultKeygenVerificationSuccessEvent = defineEvent(
  'BitcoinVault.KeygenVerificationSuccess',
  bitcoinVaultKeygenVerificationSuccess,
);

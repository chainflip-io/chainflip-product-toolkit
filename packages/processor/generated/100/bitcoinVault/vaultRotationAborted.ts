import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultVaultRotationAborted = z.null();

export const bitcoinVaultVaultRotationAbortedEvent = defineEvent(
  'BitcoinVault.VaultRotationAborted',
  bitcoinVaultVaultRotationAborted,
);

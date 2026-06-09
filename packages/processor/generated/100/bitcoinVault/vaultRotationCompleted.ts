import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultVaultRotationCompleted = z.null();

export const bitcoinVaultVaultRotationCompletedEvent = defineEvent(
  'BitcoinVault.VaultRotationCompleted',
  bitcoinVaultVaultRotationCompleted,
);

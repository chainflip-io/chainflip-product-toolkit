import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultVaultRotationCompleted = z.null();

export const ethereumVaultVaultRotationCompletedEvent = defineEvent(
  'EthereumVault.VaultRotationCompleted',
  ethereumVaultVaultRotationCompleted,
);

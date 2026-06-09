import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultVaultRotationAborted = z.null();

export const ethereumVaultVaultRotationAbortedEvent = defineEvent(
  'EthereumVault.VaultRotationAborted',
  ethereumVaultVaultRotationAborted,
);

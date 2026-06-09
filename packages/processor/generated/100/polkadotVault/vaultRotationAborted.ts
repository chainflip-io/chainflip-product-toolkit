import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultVaultRotationAborted = z.null();

export const polkadotVaultVaultRotationAbortedEvent = defineEvent(
  'PolkadotVault.VaultRotationAborted',
  polkadotVaultVaultRotationAborted,
);

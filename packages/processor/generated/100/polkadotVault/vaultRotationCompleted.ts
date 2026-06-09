import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultVaultRotationCompleted = z.null();

export const polkadotVaultVaultRotationCompletedEvent = defineEvent(
  'PolkadotVault.VaultRotationCompleted',
  polkadotVaultVaultRotationCompleted,
);

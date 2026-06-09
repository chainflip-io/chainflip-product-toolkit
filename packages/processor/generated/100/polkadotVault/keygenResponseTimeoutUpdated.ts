import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

export const polkadotVaultKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'PolkadotVault.KeygenResponseTimeoutUpdated',
  polkadotVaultKeygenResponseTimeoutUpdated,
);

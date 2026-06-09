import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

export const ethereumVaultKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'EthereumVault.KeygenResponseTimeoutUpdated',
  ethereumVaultKeygenResponseTimeoutUpdated,
);

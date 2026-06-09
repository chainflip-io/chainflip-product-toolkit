import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenResponseTimeoutUpdated = z.object({ newTimeout: z.number() });

export const bitcoinVaultKeygenResponseTimeoutUpdatedEvent = defineEvent(
  'BitcoinVault.KeygenResponseTimeoutUpdated',
  bitcoinVaultKeygenResponseTimeoutUpdated,
);

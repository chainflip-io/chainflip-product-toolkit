import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultNoKeyHandover = z.null();

export const bitcoinVaultNoKeyHandoverEvent = defineEvent(
  'BitcoinVault.NoKeyHandover',
  bitcoinVaultNoKeyHandover,
);

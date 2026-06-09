import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultNoKeyHandover = z.null();

export const ethereumVaultNoKeyHandoverEvent = defineEvent(
  'EthereumVault.NoKeyHandover',
  ethereumVaultNoKeyHandover,
);

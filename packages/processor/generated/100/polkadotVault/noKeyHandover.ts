import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultNoKeyHandover = z.null();

export const polkadotVaultNoKeyHandoverEvent = defineEvent(
  'PolkadotVault.NoKeyHandover',
  polkadotVaultNoKeyHandover,
);

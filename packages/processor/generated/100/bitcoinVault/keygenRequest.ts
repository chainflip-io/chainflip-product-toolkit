import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenRequest = z.object({
  ceremonyId: numberOrHex,
  participants: z.array(accountId),
  epochIndex: z.number(),
});

export const bitcoinVaultKeygenRequestEvent = defineEvent(
  'BitcoinVault.KeygenRequest',
  bitcoinVaultKeygenRequest,
);

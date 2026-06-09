import { z } from 'zod';
import { accountId, cfChainsBtcAggKey, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverRequest = z.object({
  ceremonyId: numberOrHex,
  fromEpoch: z.number(),
  keyToShare: cfChainsBtcAggKey,
  sharingParticipants: z.array(accountId),
  receivingParticipants: z.array(accountId),
  newKey: cfChainsBtcAggKey,
  toEpoch: z.number(),
});

export const bitcoinVaultKeyHandoverRequestEvent = defineEvent(
  'BitcoinVault.KeyHandoverRequest',
  bitcoinVaultKeyHandoverRequest,
);

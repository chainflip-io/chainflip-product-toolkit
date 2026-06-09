import { z } from 'zod';
import { accountId, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverRequest = z.object({
  ceremonyId: numberOrHex,
  fromEpoch: z.number(),
  keyToShare: hexString,
  sharingParticipants: z.array(accountId),
  receivingParticipants: z.array(accountId),
  newKey: hexString,
  toEpoch: z.number(),
});

export const polkadotVaultKeyHandoverRequestEvent = defineEvent(
  'PolkadotVault.KeyHandoverRequest',
  polkadotVaultKeyHandoverRequest,
);

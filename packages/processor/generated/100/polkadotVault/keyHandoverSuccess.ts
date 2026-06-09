import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

export const polkadotVaultKeyHandoverSuccessEvent = defineEvent(
  'PolkadotVault.KeyHandoverSuccess',
  polkadotVaultKeyHandoverSuccess,
);

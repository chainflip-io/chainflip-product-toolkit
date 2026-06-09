import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

export const bitcoinVaultKeyHandoverSuccessEvent = defineEvent(
  'BitcoinVault.KeyHandoverSuccess',
  bitcoinVaultKeyHandoverSuccess,
);

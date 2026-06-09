import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverFailure = z.object({ ceremonyId: numberOrHex });

export const bitcoinVaultKeyHandoverFailureEvent = defineEvent(
  'BitcoinVault.KeyHandoverFailure',
  bitcoinVaultKeyHandoverFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenVerificationFailure = z.object({ keygenCeremonyId: numberOrHex });

export const bitcoinVaultKeygenVerificationFailureEvent = defineEvent(
  'BitcoinVault.KeygenVerificationFailure',
  bitcoinVaultKeygenVerificationFailure,
);

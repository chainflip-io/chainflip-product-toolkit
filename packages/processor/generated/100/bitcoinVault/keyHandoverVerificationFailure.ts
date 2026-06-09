import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

export const bitcoinVaultKeyHandoverVerificationFailureEvent = defineEvent(
  'BitcoinVault.KeyHandoverVerificationFailure',
  bitcoinVaultKeyHandoverVerificationFailure,
);

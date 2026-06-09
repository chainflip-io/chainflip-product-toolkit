import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

export const ethereumVaultKeyHandoverVerificationFailureEvent = defineEvent(
  'EthereumVault.KeyHandoverVerificationFailure',
  ethereumVaultKeyHandoverVerificationFailure,
);

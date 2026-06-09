import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverVerificationFailure = z.object({
  handoverCeremonyId: numberOrHex,
});

export const polkadotVaultKeyHandoverVerificationFailureEvent = defineEvent(
  'PolkadotVault.KeyHandoverVerificationFailure',
  polkadotVaultKeyHandoverVerificationFailure,
);

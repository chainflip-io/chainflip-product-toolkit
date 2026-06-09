import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenVerificationFailure = z.object({ keygenCeremonyId: numberOrHex });

export const polkadotVaultKeygenVerificationFailureEvent = defineEvent(
  'PolkadotVault.KeygenVerificationFailure',
  polkadotVaultKeygenVerificationFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenVerificationFailure = z.object({ keygenCeremonyId: numberOrHex });

export const ethereumVaultKeygenVerificationFailureEvent = defineEvent(
  'EthereumVault.KeygenVerificationFailure',
  ethereumVaultKeygenVerificationFailure,
);

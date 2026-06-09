import { z } from 'zod';
import { hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenVerificationSuccess = z.object({ aggKey: hexString });

export const polkadotVaultKeygenVerificationSuccessEvent = defineEvent(
  'PolkadotVault.KeygenVerificationSuccess',
  polkadotVaultKeygenVerificationSuccess,
);

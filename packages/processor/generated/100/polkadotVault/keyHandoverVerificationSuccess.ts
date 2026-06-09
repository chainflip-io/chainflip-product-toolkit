import { z } from 'zod';
import { hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverVerificationSuccess = z.object({ aggKey: hexString });

export const polkadotVaultKeyHandoverVerificationSuccessEvent = defineEvent(
  'PolkadotVault.KeyHandoverVerificationSuccess',
  polkadotVaultKeyHandoverVerificationSuccess,
);

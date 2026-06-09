import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenFailure = numberOrHex;

export const polkadotVaultKeygenFailureEvent = defineEvent(
  'PolkadotVault.KeygenFailure',
  polkadotVaultKeygenFailure,
);

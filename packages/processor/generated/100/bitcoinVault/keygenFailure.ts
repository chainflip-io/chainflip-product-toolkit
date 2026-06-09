import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenFailure = numberOrHex;

export const bitcoinVaultKeygenFailureEvent = defineEvent(
  'BitcoinVault.KeygenFailure',
  bitcoinVaultKeygenFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenResponseTimeout = numberOrHex;

export const bitcoinVaultKeygenResponseTimeoutEvent = defineEvent(
  'BitcoinVault.KeygenResponseTimeout',
  bitcoinVaultKeygenResponseTimeout,
);

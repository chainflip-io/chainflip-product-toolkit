import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenResponseTimeout = numberOrHex;

export const ethereumVaultKeygenResponseTimeoutEvent = defineEvent(
  'EthereumVault.KeygenResponseTimeout',
  ethereumVaultKeygenResponseTimeout,
);

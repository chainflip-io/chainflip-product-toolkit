import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenFailure = numberOrHex;

export const ethereumVaultKeygenFailureEvent = defineEvent(
  'EthereumVault.KeygenFailure',
  ethereumVaultKeygenFailure,
);

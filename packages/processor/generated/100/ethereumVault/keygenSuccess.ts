import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenSuccess = numberOrHex;

export const ethereumVaultKeygenSuccessEvent = defineEvent(
  'EthereumVault.KeygenSuccess',
  ethereumVaultKeygenSuccess,
);

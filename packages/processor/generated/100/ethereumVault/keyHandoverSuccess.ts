import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

export const ethereumVaultKeyHandoverSuccessEvent = defineEvent(
  'EthereumVault.KeyHandoverSuccess',
  ethereumVaultKeyHandoverSuccess,
);

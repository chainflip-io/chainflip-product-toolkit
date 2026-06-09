import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeyHandoverResponseTimeout = z.object({ ceremonyId: numberOrHex });

export const ethereumVaultKeyHandoverResponseTimeoutEvent = defineEvent(
  'EthereumVault.KeyHandoverResponseTimeout',
  ethereumVaultKeyHandoverResponseTimeout,
);

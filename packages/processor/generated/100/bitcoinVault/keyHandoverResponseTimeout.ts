import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverResponseTimeout = z.object({ ceremonyId: numberOrHex });

export const bitcoinVaultKeyHandoverResponseTimeoutEvent = defineEvent(
  'BitcoinVault.KeyHandoverResponseTimeout',
  bitcoinVaultKeyHandoverResponseTimeout,
);

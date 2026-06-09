import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverResponseTimeout = z.object({ ceremonyId: numberOrHex });

export const polkadotVaultKeyHandoverResponseTimeoutEvent = defineEvent(
  'PolkadotVault.KeyHandoverResponseTimeout',
  polkadotVaultKeyHandoverResponseTimeout,
);

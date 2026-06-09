import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenResponseTimeout = numberOrHex;

export const polkadotVaultKeygenResponseTimeoutEvent = defineEvent(
  'PolkadotVault.KeygenResponseTimeout',
  polkadotVaultKeygenResponseTimeout,
);

import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverSuccessReported = accountId;

export const polkadotVaultKeyHandoverSuccessReportedEvent = defineEvent(
  'PolkadotVault.KeyHandoverSuccessReported',
  polkadotVaultKeyHandoverSuccessReported,
);

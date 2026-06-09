import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenSuccessReported = accountId;

export const polkadotVaultKeygenSuccessReportedEvent = defineEvent(
  'PolkadotVault.KeygenSuccessReported',
  polkadotVaultKeygenSuccessReported,
);

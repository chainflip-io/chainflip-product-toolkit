import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeyHandoverFailureReported = accountId;

export const polkadotVaultKeyHandoverFailureReportedEvent = defineEvent(
  'PolkadotVault.KeyHandoverFailureReported',
  polkadotVaultKeyHandoverFailureReported,
);

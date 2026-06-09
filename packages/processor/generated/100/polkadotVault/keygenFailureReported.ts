import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotVaultKeygenFailureReported = accountId;

export const polkadotVaultKeygenFailureReportedEvent = defineEvent(
  'PolkadotVault.KeygenFailureReported',
  polkadotVaultKeygenFailureReported,
);

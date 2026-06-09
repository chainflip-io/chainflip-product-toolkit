import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeyHandoverFailureReported = accountId;

export const ethereumVaultKeyHandoverFailureReportedEvent = defineEvent(
  'EthereumVault.KeyHandoverFailureReported',
  ethereumVaultKeyHandoverFailureReported,
);

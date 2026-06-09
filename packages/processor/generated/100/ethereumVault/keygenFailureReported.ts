import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenFailureReported = accountId;

export const ethereumVaultKeygenFailureReportedEvent = defineEvent(
  'EthereumVault.KeygenFailureReported',
  ethereumVaultKeygenFailureReported,
);

import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenFailureReported = accountId;

export const bitcoinVaultKeygenFailureReportedEvent = defineEvent(
  'BitcoinVault.KeygenFailureReported',
  bitcoinVaultKeygenFailureReported,
);

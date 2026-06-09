import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeygenSuccessReported = accountId;

export const bitcoinVaultKeygenSuccessReportedEvent = defineEvent(
  'BitcoinVault.KeygenSuccessReported',
  bitcoinVaultKeygenSuccessReported,
);

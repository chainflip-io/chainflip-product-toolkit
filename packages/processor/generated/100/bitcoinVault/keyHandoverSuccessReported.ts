import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverSuccessReported = accountId;

export const bitcoinVaultKeyHandoverSuccessReportedEvent = defineEvent(
  'BitcoinVault.KeyHandoverSuccessReported',
  bitcoinVaultKeyHandoverSuccessReported,
);

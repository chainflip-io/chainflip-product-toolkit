import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinVaultKeyHandoverFailureReported = accountId;

export const bitcoinVaultKeyHandoverFailureReportedEvent = defineEvent(
  'BitcoinVault.KeyHandoverFailureReported',
  bitcoinVaultKeyHandoverFailureReported,
);

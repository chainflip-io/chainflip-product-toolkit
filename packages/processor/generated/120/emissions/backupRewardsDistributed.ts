import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const emissionsBackupRewardsDistributed = z.object({ accountId, amount: numberOrHex });

export const emissionsBackupRewardsDistributedEvent = defineEvent(
  'Emissions.BackupRewardsDistributed',
  emissionsBackupRewardsDistributed,
);

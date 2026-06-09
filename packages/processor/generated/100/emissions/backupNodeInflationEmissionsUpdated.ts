import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const emissionsBackupNodeInflationEmissionsUpdated = z.number();

export const emissionsBackupNodeInflationEmissionsUpdatedEvent = defineEvent(
  'Emissions.BackupNodeInflationEmissionsUpdated',
  emissionsBackupNodeInflationEmissionsUpdated,
);

import { z } from 'zod';
import { accountId, numberOrHex } from '../common';

export const emissionsBackupRewardsDistributed = z.object({ accountId, amount: numberOrHex });

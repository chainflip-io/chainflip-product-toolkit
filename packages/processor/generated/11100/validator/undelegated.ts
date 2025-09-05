import { z } from 'zod';
import { accountId } from '../common';

export const validatorUndelegated = z.object({ delegator: accountId, operator: accountId });

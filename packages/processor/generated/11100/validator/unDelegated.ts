import { z } from 'zod';
import { accountId } from '../common';

export const validatorUnDelegated = z.object({ delegator: accountId, operator: accountId });

import { z } from 'zod';
import { accountId } from '../common';

export const validatorDelegated = z.object({ delegator: accountId, operator: accountId });

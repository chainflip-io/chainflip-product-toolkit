import { z } from 'zod';
import { accountId, hexString } from '../common';

export const validatorPeerIdUnregistered = z.tuple([accountId, hexString]);

import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

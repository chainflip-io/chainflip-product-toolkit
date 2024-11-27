import { z } from 'zod';
import { numberOrHex } from '../common';

export const bitcoinIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

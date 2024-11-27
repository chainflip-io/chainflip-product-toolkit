import { z } from 'zod';
import { numberOrHex } from '../common';

export const arbitrumIngressEgressDepositChannelLifetimeSet = z.object({ lifetime: numberOrHex });

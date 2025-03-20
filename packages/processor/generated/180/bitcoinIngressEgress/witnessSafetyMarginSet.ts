import { z } from 'zod';
import { numberOrHex } from '../common';

export const bitcoinIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

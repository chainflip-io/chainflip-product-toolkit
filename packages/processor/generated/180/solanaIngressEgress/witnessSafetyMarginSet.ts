import { z } from 'zod';
import { numberOrHex } from '../common';

export const solanaIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

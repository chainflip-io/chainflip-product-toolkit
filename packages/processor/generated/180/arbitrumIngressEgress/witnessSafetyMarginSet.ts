import { z } from 'zod';
import { numberOrHex } from '../common';

export const arbitrumIngressEgressWitnessSafetyMarginSet = z.object({ margin: numberOrHex });

import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingBrokerBondSet = z.object({ bond: numberOrHex });

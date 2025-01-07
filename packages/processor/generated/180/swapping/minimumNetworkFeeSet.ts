import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingMinimumNetworkFeeSet = z.object({ minFee: numberOrHex });

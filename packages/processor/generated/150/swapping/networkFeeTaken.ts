import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingNetworkFeeTaken = z.object({ swapId: numberOrHex, feeAmount: numberOrHex });

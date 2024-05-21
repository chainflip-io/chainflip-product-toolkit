import { z } from 'zod';
import { numberOrHex } from '../common';

export const liquidityPoolsNetworkFeeTaken = z.object({ feeAmount: numberOrHex });

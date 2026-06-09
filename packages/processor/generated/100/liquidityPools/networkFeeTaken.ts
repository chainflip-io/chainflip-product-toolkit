import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityPoolsNetworkFeeTaken = z.object({ feeAmount: numberOrHex });

export const liquidityPoolsNetworkFeeTakenEvent = defineEvent(
  'LiquidityPools.NetworkFeeTaken',
  liquidityPoolsNetworkFeeTaken,
);

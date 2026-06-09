import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingNetworkFeeTaken = z.object({ swapId: numberOrHex, feeAmount: numberOrHex });

export const swappingNetworkFeeTakenEvent = defineEvent(
  'Swapping.NetworkFeeTaken',
  swappingNetworkFeeTaken,
);

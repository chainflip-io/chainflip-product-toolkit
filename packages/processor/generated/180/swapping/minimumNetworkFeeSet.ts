import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMinimumNetworkFeeSet = z.object({ minFee: numberOrHex });

export const swappingMinimumNetworkFeeSetEvent = defineEvent(
  'Swapping.MinimumNetworkFeeSet',
  swappingMinimumNetworkFeeSet,
);

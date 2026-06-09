import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

export const arbitrumIngressEgressChannelOpeningFeeSetEvent = defineEvent(
  'ArbitrumIngressEgress.ChannelOpeningFeeSet',
  arbitrumIngressEgressChannelOpeningFeeSet,
);

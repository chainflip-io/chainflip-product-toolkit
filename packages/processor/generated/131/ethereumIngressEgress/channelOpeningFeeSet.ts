import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

export const ethereumIngressEgressChannelOpeningFeeSetEvent = defineEvent(
  'EthereumIngressEgress.ChannelOpeningFeeSet',
  ethereumIngressEgressChannelOpeningFeeSet,
);

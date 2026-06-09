import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

export const assethubIngressEgressChannelOpeningFeeSetEvent = defineEvent(
  'AssethubIngressEgress.ChannelOpeningFeeSet',
  assethubIngressEgressChannelOpeningFeeSet,
);

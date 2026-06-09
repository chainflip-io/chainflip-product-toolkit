import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

export const bitcoinIngressEgressChannelOpeningFeeSetEvent = defineEvent(
  'BitcoinIngressEgress.ChannelOpeningFeeSet',
  bitcoinIngressEgressChannelOpeningFeeSet,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

export const polkadotIngressEgressChannelOpeningFeeSetEvent = defineEvent(
  'PolkadotIngressEgress.ChannelOpeningFeeSet',
  polkadotIngressEgressChannelOpeningFeeSet,
);

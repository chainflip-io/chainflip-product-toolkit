import { z } from 'zod';
import { numberOrHex } from '../common';

export const polkadotIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

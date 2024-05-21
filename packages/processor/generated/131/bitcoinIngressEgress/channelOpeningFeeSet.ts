import { z } from 'zod';
import { numberOrHex } from '../common';

export const bitcoinIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

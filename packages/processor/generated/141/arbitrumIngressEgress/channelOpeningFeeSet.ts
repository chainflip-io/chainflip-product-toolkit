import { z } from 'zod';
import { numberOrHex } from '../common';

export const arbitrumIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

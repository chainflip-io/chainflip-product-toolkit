import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

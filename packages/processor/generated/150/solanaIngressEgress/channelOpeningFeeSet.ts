import { z } from 'zod';
import { numberOrHex } from '../common';

export const solanaIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

import { z } from 'zod';
import { numberOrHex } from '../common';

export const assethubIngressEgressChannelOpeningFeeSet = z.object({ fee: numberOrHex });

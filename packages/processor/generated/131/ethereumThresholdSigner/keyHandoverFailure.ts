import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumThresholdSignerKeyHandoverFailure = z.object({ ceremonyId: numberOrHex });

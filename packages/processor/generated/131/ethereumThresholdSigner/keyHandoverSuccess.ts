import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumThresholdSignerKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

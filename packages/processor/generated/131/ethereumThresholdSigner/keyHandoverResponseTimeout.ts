import { z } from 'zod';
import { numberOrHex } from '../common';

export const ethereumThresholdSignerKeyHandoverResponseTimeout = z.object({
  ceremonyId: numberOrHex,
});

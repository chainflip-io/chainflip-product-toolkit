import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';

export const ethereumThresholdSignerKeyHandoverVerificationSuccess = z.object({
  aggKey: cfChainsEvmAggKey,
});

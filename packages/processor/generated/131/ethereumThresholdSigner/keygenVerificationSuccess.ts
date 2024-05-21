import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';

export const ethereumThresholdSignerKeygenVerificationSuccess = z.object({
  aggKey: cfChainsEvmAggKey,
});

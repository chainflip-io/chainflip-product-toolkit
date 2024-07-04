import { z } from 'zod';
import { accountId, cfChainsEvmAggKey, numberOrHex } from '../common';

export const ethereumThresholdSignerKeyHandoverRequest = z.object({
  ceremonyId: numberOrHex,
  fromEpoch: z.number(),
  keyToShare: cfChainsEvmAggKey,
  sharingParticipants: z.array(accountId),
  receivingParticipants: z.array(accountId),
  newKey: cfChainsEvmAggKey,
  toEpoch: z.number(),
});

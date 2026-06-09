import { z } from 'zod';
import { accountId, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenRequest = z.object({
  ceremonyId: numberOrHex,
  participants: z.array(accountId),
  epochIndex: z.number(),
});

export const ethereumThresholdSignerKeygenRequestEvent = defineEvent(
  'EthereumThresholdSigner.KeygenRequest',
  ethereumThresholdSignerKeygenRequest,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverSuccess = z.object({ ceremonyId: numberOrHex });

export const ethereumThresholdSignerKeyHandoverSuccessEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverSuccess',
  ethereumThresholdSignerKeyHandoverSuccess,
);

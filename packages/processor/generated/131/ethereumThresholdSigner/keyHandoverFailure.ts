import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverFailure = z.object({ ceremonyId: numberOrHex });

export const ethereumThresholdSignerKeyHandoverFailureEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverFailure',
  ethereumThresholdSignerKeyHandoverFailure,
);

import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverResponseTimeout = z.object({
  ceremonyId: numberOrHex,
});

export const ethereumThresholdSignerKeyHandoverResponseTimeoutEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverResponseTimeout',
  ethereumThresholdSignerKeyHandoverResponseTimeout,
);

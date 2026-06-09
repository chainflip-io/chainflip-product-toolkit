import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerNoKeyHandover = z.null();

export const ethereumThresholdSignerNoKeyHandoverEvent = defineEvent(
  'EthereumThresholdSigner.NoKeyHandover',
  ethereumThresholdSignerNoKeyHandover,
);

import { z } from 'zod';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyRotationCompleted = z.null();

export const ethereumThresholdSignerKeyRotationCompletedEvent = defineEvent(
  'EthereumThresholdSigner.KeyRotationCompleted',
  ethereumThresholdSignerKeyRotationCompleted,
);

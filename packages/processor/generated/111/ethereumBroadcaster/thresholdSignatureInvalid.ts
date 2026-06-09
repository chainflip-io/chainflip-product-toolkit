import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterThresholdSignatureInvalid = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const ethereumBroadcasterThresholdSignatureInvalidEvent = defineEvent(
  'EthereumBroadcaster.ThresholdSignatureInvalid',
  ethereumBroadcasterThresholdSignatureInvalid,
);

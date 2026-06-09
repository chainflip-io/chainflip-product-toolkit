import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinBroadcasterThresholdSignatureInvalid = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const bitcoinBroadcasterThresholdSignatureInvalidEvent = defineEvent(
  'BitcoinBroadcaster.ThresholdSignatureInvalid',
  bitcoinBroadcasterThresholdSignatureInvalid,
);

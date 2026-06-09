import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenSuccess = numberOrHex;

export const ethereumThresholdSignerKeygenSuccessEvent = defineEvent(
  'EthereumThresholdSigner.KeygenSuccess',
  ethereumThresholdSignerKeygenSuccess,
);

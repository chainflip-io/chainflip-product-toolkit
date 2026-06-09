import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenResponseTimeout = numberOrHex;

export const ethereumThresholdSignerKeygenResponseTimeoutEvent = defineEvent(
  'EthereumThresholdSigner.KeygenResponseTimeout',
  ethereumThresholdSignerKeygenResponseTimeout,
);

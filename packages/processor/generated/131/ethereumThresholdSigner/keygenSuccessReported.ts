import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenSuccessReported = accountId;

export const ethereumThresholdSignerKeygenSuccessReportedEvent = defineEvent(
  'EthereumThresholdSigner.KeygenSuccessReported',
  ethereumThresholdSignerKeygenSuccessReported,
);

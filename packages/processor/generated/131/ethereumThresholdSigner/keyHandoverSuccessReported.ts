import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverSuccessReported = accountId;

export const ethereumThresholdSignerKeyHandoverSuccessReportedEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverSuccessReported',
  ethereumThresholdSignerKeyHandoverSuccessReported,
);

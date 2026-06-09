import { z } from 'zod';
import { accountId, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const fundingFunded = z.object({
  accountId,
  txHash: hexString,
  fundsAdded: numberOrHex,
  totalBalance: numberOrHex,
});

export const fundingFundedEvent = defineEvent('Funding.Funded', fundingFunded);

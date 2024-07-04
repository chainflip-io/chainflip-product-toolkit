import { z } from 'zod';
import { accountId, hexString, numberOrHex } from '../common';

export const fundingFunded = z.object({
  accountId,
  txHash: hexString,
  fundsAdded: numberOrHex,
  totalBalance: numberOrHex,
});

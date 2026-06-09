import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeyHandoverVerificationSuccess = z.object({ aggKey: cfChainsEvmAggKey });

export const ethereumVaultKeyHandoverVerificationSuccessEvent = defineEvent(
  'EthereumVault.KeyHandoverVerificationSuccess',
  ethereumVaultKeyHandoverVerificationSuccess,
);

import { z } from 'zod';
import { cfChainsEvmAggKey } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumVaultKeygenVerificationSuccess = z.object({ aggKey: cfChainsEvmAggKey });

export const ethereumVaultKeygenVerificationSuccessEvent = defineEvent(
  'EthereumVault.KeygenVerificationSuccess',
  ethereumVaultKeygenVerificationSuccess,
);

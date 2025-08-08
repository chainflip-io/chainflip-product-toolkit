import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingSwapCanceled = z.object({ swapId: numberOrHex });

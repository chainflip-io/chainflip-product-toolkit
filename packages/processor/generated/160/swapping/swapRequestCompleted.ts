import { z } from 'zod';
import { numberOrHex } from '../common';

export const swappingSwapRequestCompleted = z.object({ swapRequestId: numberOrHex });

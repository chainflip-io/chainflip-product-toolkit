import { z } from 'zod';
import { palletCfIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfIngressEgressBoostPoolIdBitcoin,
});

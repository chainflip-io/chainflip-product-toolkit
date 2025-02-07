import { z } from 'zod';
import { palletCfBitcoinIngressEgressBoostPoolIdBitcoin } from '../common';

export const bitcoinIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfBitcoinIngressEgressBoostPoolIdBitcoin,
});

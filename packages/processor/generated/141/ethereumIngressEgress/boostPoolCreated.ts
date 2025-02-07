import { z } from 'zod';
import { palletCfEthereumIngressEgressBoostPoolIdEthereum } from '../common';

export const ethereumIngressEgressBoostPoolCreated = z.object({
  boostPool: palletCfEthereumIngressEgressBoostPoolIdEthereum,
});

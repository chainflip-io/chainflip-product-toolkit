import { z } from 'zod';
import { bitcoinIngressEgressPalletConfigUpdated as vNewer } from '../../11200/bitcoinIngressEgress/palletConfigUpdated';
import { bitcoinIngressEgressPalletConfigUpdated as vOlder } from '../../11100/bitcoinIngressEgress/palletConfigUpdated';

export function bitcoinIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function bitcoinIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function bitcoinIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}

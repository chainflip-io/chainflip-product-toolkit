import { z } from 'zod';
import { arbitrumIngressEgressPalletConfigUpdated as vNewer } from '../../11200/arbitrumIngressEgress/palletConfigUpdated';
import { arbitrumIngressEgressPalletConfigUpdated as vOlder } from '../../11100/arbitrumIngressEgress/palletConfigUpdated';

export function arbitrumIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function arbitrumIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function arbitrumIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}

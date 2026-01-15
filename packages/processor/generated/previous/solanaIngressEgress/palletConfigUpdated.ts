import { z } from 'zod';
import { solanaIngressEgressPalletConfigUpdated as vNewer } from '../../11200/solanaIngressEgress/palletConfigUpdated';
import { solanaIngressEgressPalletConfigUpdated as vOlder } from '../../11100/solanaIngressEgress/palletConfigUpdated';

export function solanaIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function solanaIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function solanaIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}

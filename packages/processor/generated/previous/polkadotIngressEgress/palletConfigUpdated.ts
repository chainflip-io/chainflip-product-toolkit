import { z } from 'zod';
import { polkadotIngressEgressPalletConfigUpdated as vNewer } from '../../11200/polkadotIngressEgress/palletConfigUpdated';
import { polkadotIngressEgressPalletConfigUpdated as vOlder } from '../../11100/polkadotIngressEgress/palletConfigUpdated';

export function polkadotIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function polkadotIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function polkadotIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}

import { z } from 'zod';
import { polkadotIngressEgressDepositFailed as vNewer } from '../../11200/polkadotIngressEgress/depositFailed';
import { polkadotIngressEgressDepositFailed as vOlder } from '../../11100/polkadotIngressEgress/depositFailed';

export function polkadotIngressEgressDepositFailed(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function polkadotIngressEgressDepositFailed(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function polkadotIngressEgressDepositFailed(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}

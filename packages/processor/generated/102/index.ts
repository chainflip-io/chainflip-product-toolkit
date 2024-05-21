import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { accountRolesAccountRoleRegistered } from './accountRoles/accountRoleRegistered';
import { validatorPalletConfigUpdated } from './validator/palletConfigUpdated';
import { swappingMaximumSwapAmountSet } from './swapping/maximumSwapAmountSet';
import { swappingSwapAmountConfiscated } from './swapping/swapAmountConfiscated';

export type AccountRolesAccountRoleRegistered = EventHandler<
  z.output<typeof accountRolesAccountRoleRegistered>
>;
export type ValidatorPalletConfigUpdated = EventHandler<
  z.output<typeof validatorPalletConfigUpdated>
>;
export type SwappingMaximumSwapAmountSet = EventHandler<
  z.output<typeof swappingMaximumSwapAmountSet>
>;
export type SwappingSwapAmountConfiscated = EventHandler<
  z.output<typeof swappingSwapAmountConfiscated>
>;

type HandlerMap = {
  AccountRoles?: {
    AccountRoleRegistered?: AccountRolesAccountRoleRegistered;
  };
  Validator?: {
    PalletConfigUpdated?: ValidatorPalletConfigUpdated;
  };
  Swapping?: {
    MaximumSwapAmountSet?: SwappingMaximumSwapAmountSet;
    SwapAmountConfiscated?: SwappingSwapAmountConfiscated;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 102,
  handlers: [
    {
      name: 'AccountRoles.AccountRoleRegistered',
      handler: wrapHandler(
        map.AccountRoles?.AccountRoleRegistered,
        accountRolesAccountRoleRegistered,
      ),
    },
    {
      name: 'Validator.PalletConfigUpdated',
      handler: wrapHandler(map.Validator?.PalletConfigUpdated, validatorPalletConfigUpdated),
    },
    {
      name: 'Swapping.MaximumSwapAmountSet',
      handler: wrapHandler(map.Swapping?.MaximumSwapAmountSet, swappingMaximumSwapAmountSet),
    },
    {
      name: 'Swapping.SwapAmountConfiscated',
      handler: wrapHandler(map.Swapping?.SwapAmountConfiscated, swappingSwapAmountConfiscated),
    },
  ].filter((h): h is { name: string; handler: InternalEventHandler } => h.handler !== undefined),
});

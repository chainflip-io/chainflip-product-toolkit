import { validatorDelegated as vParser } from '../../11100/validator/delegated';

export function validatorDelegated(): typeof vParser;
export function validatorDelegated() {
  return vParser;
}
